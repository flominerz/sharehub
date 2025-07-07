/*
  # ShareHub Sample Data Migration

  This migration seeds the database with comprehensive sample data extracted from the frontend components.
  
  ## Data Sources Migrated:
  1. Categories (from useCategories.ts fallback data)
  2. Sample Users/Profiles (for resource owners)
  3. Resources (from Marketplace.tsx and other components)
  4. Bookings (from Calendar.tsx)
  5. Reviews (from ResourceDetails.tsx)
  6. Conversations and Messages (sample data)
  7. Favorites (sample relationships)

  ## Data Transformations:
  - Converted frontend mock data to proper database format
  - Generated UUIDs for all entities
  - Established proper foreign key relationships
  - Converted price strings to numeric values
  - Standardized date formats
  - Created realistic user profiles for resource owners
*/

-- First, let's create some sample user profiles (these will be the resource owners)
INSERT INTO profiles (id, email, name, avatar_url, phone, location, bio, rating, total_reviews, tokens_earned, member_since, is_verified, response_time_hours) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'john.doe@example.com', 'John D.', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', '+1-555-0101', 'Downtown', 'Experienced handyman and tool enthusiast. Happy to share my collection with the community!', 4.8, 47, 245, '2023-01-15 10:00:00+00', true, 2),
  ('550e8400-e29b-41d4-a716-446655440002', 'emma.lopez@example.com', 'Emma L.', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', '+1-555-0102', 'Music District', 'Professional musician and guitar instructor with 10+ years of experience. Passionate about teaching!', 5.0, 32, 180, '2022-03-20 14:30:00+00', true, 1),
  ('550e8400-e29b-41d4-a716-446655440003', 'david.kim@example.com', 'David K.', 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150', '+1-555-0103', 'City Center', 'City professional offering convenient parking solutions. Reliable and responsive!', 4.7, 23, 156, '2023-08-10 09:15:00+00', true, 3),
  ('550e8400-e29b-41d4-a716-446655440004', 'sarah.martinez@example.com', 'Sarah M.', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150', '+1-555-0104', 'Arts Quarter', 'Professional photographer and videographer. Love sharing my equipment with fellow creatives!', 4.9, 31, 220, '2022-11-05 16:45:00+00', true, 2),
  ('550e8400-e29b-41d4-a716-446655440005', 'mike.rodriguez@example.com', 'Mike R.', 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150', '+1-555-0105', 'Bike District', 'Certified bike mechanic with mobile repair service. Keeping the community rolling!', 4.7, 22, 134, '2023-04-12 11:20:00+00', true, 4),
  ('550e8400-e29b-41d4-a716-446655440006', 'lisa.thompson@example.com', 'Lisa T.', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', '+1-555-0106', 'Residential Area', 'Eco-conscious car owner promoting sustainable transportation sharing.', 4.5, 15, 98, '2023-06-18 13:10:00+00', true, 6),
  ('550e8400-e29b-41d4-a716-446655440007', 'alex.parker@example.com', 'Alex P.', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150', '+1-555-0107', 'Business District', 'Business consultant offering professional meeting spaces and equipment.', 4.8, 9, 67, '2023-09-22 08:30:00+00', true, 3),
  ('550e8400-e29b-41d4-a716-446655440008', 'tom.wilson@example.com', 'Tom W.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', '+1-555-0108', 'Suburbs', 'Gardening enthusiast and lawn care expert. Sharing tools for a greener community!', 4.4, 7, 45, '2023-05-30 15:45:00+00', true, 5);

-- Insert categories (extracted from useCategories.ts fallback data)
INSERT INTO categories (id, name, description, icon) VALUES
  ('cat-550e8400-e29b-41d4-a716-446655440001', 'Tools', 'Power tools and equipment for DIY projects', 'wrench'),
  ('cat-550e8400-e29b-41d4-a716-446655440002', 'Skills', 'Professional services and tutoring', 'lightbulb'),
  ('cat-550e8400-e29b-41d4-a716-446655440003', 'Vehicles', 'Cars, bikes, and transportation', 'truck'),
  ('cat-550e8400-e29b-41d4-a716-446655440004', 'Spaces', 'Meeting rooms and storage', 'building'),
  ('cat-550e8400-e29b-41d4-a716-446655440005', 'Services', 'Professional services', 'users'),
  ('cat-550e8400-e29b-41d4-a716-446655440006', 'Equipment', 'Cameras and electronics', 'camera');

-- Insert resources (extracted and transformed from Marketplace.tsx and other components)
INSERT INTO resources (id, owner_id, category_id, name, description, price, price_type, location, latitude, longitude, is_available, features, images, rating, total_reviews, total_bookings) VALUES
  ('res-550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'cat-550e8400-e29b-41d4-a716-446655440001', 'Professional Power Drill', 'High-quality cordless drill perfect for home improvement projects. Features a powerful 18V battery, multiple speed settings, and comes with a complete set of drill bits and screwdriver attachments. The drill has been well-maintained and is in excellent working condition.', 5.00, 'day', 'Downtown', 40.7128, -74.0060, true, ARRAY['18V Lithium-ion battery', 'Variable speed trigger', 'LED work light', 'Complete drill bit set included', 'Carrying case provided', 'Recently serviced and calibrated'], ARRAY['https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800'], 4.8, 24, 45),
  
  ('res-550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'cat-550e8400-e29b-41d4-a716-446655440002', 'Guitar Lessons - Beginner to Advanced', 'Professional guitar instruction for all skill levels. I am a classically trained guitarist with over 10 years of teaching experience. Whether you are a complete beginner or looking to refine advanced techniques, I can help you achieve your musical goals. Lessons are tailored to your preferred style - classical, rock, folk, or jazz.', 25.00, 'hour', 'Music District', 40.7589, -73.9851, true, ARRAY['Personalized lesson plans', 'All skill levels welcome', 'Multiple music styles covered', 'Sheet music and tabs provided', 'Performance opportunities', 'Flexible scheduling available'], ARRAY['https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=800'], 5.0, 18, 32),
  
  ('res-550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'cat-550e8400-e29b-41d4-a716-446655440004', 'Parking Space - City Center', 'Premium parking space located in the heart of the city center, just 2 blocks from the main business district. This covered parking spot offers security and convenience for daily commuters or visitors. The space is suitable for standard-sized vehicles and includes 24/7 access.', 10.00, 'day', 'City Center', 40.7505, -73.9934, true, ARRAY['Covered parking space', '24/7 access available', 'Security cameras in area', 'Close to public transport', 'Suitable for standard vehicles', 'Easy in/out access'], ARRAY['https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'], 4.6, 12, 28),
  
  ('res-550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'cat-550e8400-e29b-41d4-a716-446655440006', 'Professional Camera Equipment', 'Canon EOS R5 with professional lenses for photography and videography. Perfect for events, portraits, and creative projects. Includes multiple lenses, tripod, lighting equipment, and memory cards. All equipment is professionally maintained and insured.', 30.00, 'day', 'Arts Quarter', 40.7282, -74.0776, false, ARRAY['Canon EOS R5 camera body', 'Multiple professional lenses', 'Tripod and stabilizer', 'Professional lighting kit', 'Memory cards included', 'Carrying case provided'], ARRAY['https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800'], 4.9, 31, 67),
  
  ('res-550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'cat-550e8400-e29b-41d4-a716-446655440005', 'Bicycle Repair Service', 'Professional bicycle maintenance and repair service at your location. Certified bike mechanic with mobile service van. Services include tune-ups, brake adjustments, tire changes, and emergency repairs. Quick turnaround and fair pricing.', 15.00, 'service', 'Bike District', 40.7614, -73.9776, true, ARRAY['Mobile repair service', 'Certified bike mechanic', 'All bike types supported', 'Emergency repairs available', 'Quality parts used', 'Satisfaction guaranteed'], ARRAY['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800'], 4.7, 22, 89),
  
  ('res-550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440006', 'cat-550e8400-e29b-41d4-a716-446655440003', 'Compact Car for City Trips', 'Fuel-efficient compact car perfect for city driving and short trips. Well-maintained vehicle with excellent gas mileage, GPS navigation, and Bluetooth connectivity. Ideal for errands, airport trips, or weekend getaways.', 40.00, 'day', 'Residential Area', 40.7128, -74.0060, true, ARRAY['Fuel-efficient engine', 'GPS navigation system', 'Bluetooth connectivity', 'Air conditioning', 'Clean interior', 'Recently serviced'], ARRAY['https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800'], 4.5, 15, 34),
  
  ('res-550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440007', 'cat-550e8400-e29b-41d4-a716-446655440004', 'Meeting Room with Projector', 'Professional meeting room equipped with projector, whiteboard, and high-speed internet. Perfect for business meetings, presentations, or training sessions. Located in the business district with easy access and parking.', 20.00, 'hour', 'Business District', 40.7589, -73.9851, true, ARRAY['HD projector and screen', 'Whiteboard and markers', 'High-speed WiFi', 'Conference table for 8', 'Air conditioning', 'Coffee and water provided'], ARRAY['https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=800'], 4.8, 9, 23),
  
  ('res-550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440008', 'cat-550e8400-e29b-41d4-a716-446655440001', 'Lawn Mower - Electric', 'Eco-friendly electric lawn mower, perfect for small to medium yards. Quiet operation, zero emissions, and easy to use. Includes extension cord and safety equipment. Great for maintaining your lawn without the noise and pollution of gas mowers.', 8.00, 'day', 'Suburbs', 40.7505, -73.9934, true, ARRAY['Electric powered', 'Quiet operation', 'Zero emissions', 'Adjustable cutting height', 'Easy to maneuver', 'Safety equipment included'], ARRAY['https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800'], 4.4, 7, 18);

-- Insert sample bookings (extracted from Calendar.tsx)
INSERT INTO bookings (id, resource_id, renter_id, owner_id, start_date, end_date, start_time, duration_days, total_price, payment_method, status, special_instructions) VALUES
  ('book-550e8400-e29b-41d4-a716-446655440001', 'res-550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '2025-01-30', '2025-01-30', '14:00:00', 1, 5.00, 'ShareHub Tokens', 'confirmed', 'Need for kitchen renovation project'),
  ('book-550e8400-e29b-41d4-a716-446655440002', 'res-550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', '2025-02-01', '2025-02-01', '10:00:00', 1, 25.00, 'Credit Card', 'confirmed', 'Beginner lesson, first time learning guitar'),
  ('book-550e8400-e29b-41d4-a716-446655440003', 'res-550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', '2025-02-03', '2025-02-03', '08:00:00', 1, 10.00, 'PayPal', 'pending', 'Need parking for business meeting downtown');

-- Insert sample reviews (extracted from ResourceDetails.tsx)
INSERT INTO reviews (id, booking_id, resource_id, reviewer_id, reviewee_id, rating, comment, is_verified) VALUES
  ('rev-550e8400-e29b-41d4-a716-446655440001', 'book-550e8400-e29b-41d4-a716-446655440001', 'res-550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 5, 'Excellent quality drill, worked perfectly for my kitchen renovation project. John was very responsive and helpful!', true),
  ('rev-550e8400-e29b-41d4-a716-446655440002', 'book-550e8400-e29b-41d4-a716-446655440002', 'res-550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 5, 'Emma is an amazing guitar teacher! Very patient and knowledgeable. Highly recommend for beginners.', true),
  ('rev-550e8400-e29b-41d4-a716-446655440003', 'book-550e8400-e29b-41d4-a716-446655440001', 'res-550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 4, 'Good condition tool, exactly as described. Easy pickup and return process.', true);

-- Insert sample conversations
INSERT INTO conversations (id, participant_1, participant_2, resource_id, last_message_at) VALUES
  ('conv-550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'res-550e8400-e29b-41d4-a716-446655440001', '2025-01-29 15:30:00+00'),
  ('conv-550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'res-550e8400-e29b-41d4-a716-446655440002', '2025-01-31 09:45:00+00');

-- Insert sample messages
INSERT INTO messages (id, conversation_id, sender_id, content, is_read) VALUES
  ('msg-550e8400-e29b-41d4-a716-446655440001', 'conv-550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Hi John! I would like to rent your power drill for my kitchen renovation. Is it available tomorrow?', true),
  ('msg-550e8400-e29b-41d4-a716-446655440002', 'conv-550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Hi Emma! Yes, the drill is available tomorrow. It comes with a full set of bits and a carrying case. What time works for you?', true),
  ('msg-550e8400-e29b-41d4-a716-446655440003', 'conv-550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'Hello! I am interested in guitar lessons. I am a complete beginner. Do you have availability this weekend?', true),
  ('msg-550e8400-e29b-41d4-a716-446655440004', 'conv-550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Hi David! I would love to help you get started with guitar. I have slots available on Saturday and Sunday. What time preference do you have?', false);

-- Insert sample favorites
INSERT INTO favorites (id, user_id, resource_id) VALUES
  ('fav-550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'res-550e8400-e29b-41d4-a716-446655440001'),
  ('fav-550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'res-550e8400-e29b-41d4-a716-446655440002'),
  ('fav-550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 'res-550e8400-e29b-41d4-a716-446655440007');

-- Update resource ratings and review counts based on inserted reviews
UPDATE resources SET 
  rating = (
    SELECT ROUND(AVG(rating)::numeric, 2) 
    FROM reviews 
    WHERE resource_id = resources.id
  ),
  total_reviews = (
    SELECT COUNT(*) 
    FROM reviews 
    WHERE resource_id = resources.id
  )
WHERE id IN (
  SELECT DISTINCT resource_id FROM reviews
);

-- Update profile ratings based on reviews received
UPDATE profiles SET 
  rating = (
    SELECT ROUND(AVG(rating)::numeric, 2) 
    FROM reviews 
    WHERE reviewee_id = profiles.id
  ),
  total_reviews = (
    SELECT COUNT(*) 
    FROM reviews 
    WHERE reviewee_id = profiles.id
  )
WHERE id IN (
  SELECT DISTINCT reviewee_id FROM reviews
);

-- Verify data integrity
DO $$
DECLARE
  profile_count INTEGER;
  category_count INTEGER;
  resource_count INTEGER;
  booking_count INTEGER;
  review_count INTEGER;
  conversation_count INTEGER;
  message_count INTEGER;
  favorite_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO profile_count FROM profiles;
  SELECT COUNT(*) INTO category_count FROM categories;
  SELECT COUNT(*) INTO resource_count FROM resources;
  SELECT COUNT(*) INTO booking_count FROM bookings;
  SELECT COUNT(*) INTO review_count FROM reviews;
  SELECT COUNT(*) INTO conversation_count FROM conversations;
  SELECT COUNT(*) INTO message_count FROM messages;
  SELECT COUNT(*) INTO favorite_count FROM favorites;
  
  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'Profiles: %', profile_count;
  RAISE NOTICE 'Categories: %', category_count;
  RAISE NOTICE 'Resources: %', resource_count;
  RAISE NOTICE 'Bookings: %', booking_count;
  RAISE NOTICE 'Reviews: %', review_count;
  RAISE NOTICE 'Conversations: %', conversation_count;
  RAISE NOTICE 'Messages: %', message_count;
  RAISE NOTICE 'Favorites: %', favorite_count;
END $$;