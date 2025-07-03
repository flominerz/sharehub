/*
  # Seed Initial Data

  1. Categories
    - Insert default resource categories
  
  2. Sample Data (Optional)
    - Can be used for testing and development
*/

-- Insert default categories
INSERT INTO categories (name, description, icon) VALUES
  ('Tools', 'Power tools, hand tools, and equipment for DIY projects', 'wrench'),
  ('Skills', 'Professional services, tutoring, and skill sharing', 'lightbulb'),
  ('Vehicles', 'Cars, bikes, scooters, and transportation', 'truck'),
  ('Spaces', 'Meeting rooms, parking spaces, storage areas', 'building'),
  ('Services', 'Professional services and assistance', 'users'),
  ('Equipment', 'Cameras, electronics, and specialized equipment', 'camera')
ON CONFLICT (name) DO NOTHING;

-- Create a function to get or create conversation
CREATE OR REPLACE FUNCTION get_or_create_conversation(
  user1_id uuid,
  user2_id uuid,
  resource_id_param uuid DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  conversation_id uuid;
  participant1 uuid;
  participant2 uuid;
BEGIN
  -- Ensure consistent ordering of participants
  IF user1_id < user2_id THEN
    participant1 := user1_id;
    participant2 := user2_id;
  ELSE
    participant1 := user2_id;
    participant2 := user1_id;
  END IF;
  
  -- Try to find existing conversation
  SELECT id INTO conversation_id
  FROM conversations
  WHERE participant_1 = participant1 
    AND participant_2 = participant2
    AND (resource_id = resource_id_param OR (resource_id IS NULL AND resource_id_param IS NULL));
  
  -- If not found, create new conversation
  IF conversation_id IS NULL THEN
    INSERT INTO conversations (participant_1, participant_2, resource_id)
    VALUES (participant1, participant2, resource_id_param)
    RETURNING id INTO conversation_id;
  END IF;
  
  RETURN conversation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to search resources
CREATE OR REPLACE FUNCTION search_resources(
  search_query text DEFAULT '',
  category_filter uuid DEFAULT NULL,
  min_rating numeric DEFAULT 0,
  max_price numeric DEFAULT NULL,
  location_filter text DEFAULT '',
  limit_count integer DEFAULT 20,
  offset_count integer DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  price numeric,
  price_type price_type,
  location text,
  rating numeric,
  total_reviews integer,
  owner_name text,
  category_name text,
  images text[],
  is_available boolean
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.name,
    r.description,
    r.price,
    r.price_type,
    r.location,
    r.rating,
    r.total_reviews,
    p.name as owner_name,
    c.name as category_name,
    r.images,
    r.is_available
  FROM resources r
  JOIN profiles p ON r.owner_id = p.id
  JOIN categories c ON r.category_id = c.id
  WHERE 
    r.is_available = true
    AND (search_query = '' OR (
      to_tsvector('english', r.name || ' ' || r.description) @@ plainto_tsquery('english', search_query)
    ))
    AND (category_filter IS NULL OR r.category_id = category_filter)
    AND r.rating >= min_rating
    AND (max_price IS NULL OR r.price <= max_price)
    AND (location_filter = '' OR r.location ILIKE '%' || location_filter || '%')
  ORDER BY 
    CASE WHEN search_query != '' THEN 
      ts_rank(to_tsvector('english', r.name || ' ' || r.description), plainto_tsquery('english', search_query))
    ELSE 0 END DESC,
    r.rating DESC,
    r.created_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;