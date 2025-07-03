/*
  # Bookings and Reviews System

  1. New Tables
    - `bookings` - Resource booking records
      - `id` (uuid, primary key)
      - `resource_id` (uuid, references resources)
      - `renter_id` (uuid, references profiles)
      - `owner_id` (uuid, references profiles)
      - `start_date` (date)
      - `end_date` (date)
      - `start_time` (time, optional)
      - `duration_days` (integer)
      - `total_price` (numeric)
      - `payment_method` (text)
      - `status` (text, enum: pending/confirmed/completed/cancelled)
      - `special_instructions` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `reviews` - User reviews for resources and owners
      - `id` (uuid, primary key)
      - `booking_id` (uuid, references bookings)
      - `resource_id` (uuid, references resources)
      - `reviewer_id` (uuid, references profiles)
      - `reviewee_id` (uuid, references profiles)
      - `rating` (integer, 1-5)
      - `comment` (text)
      - `is_verified` (boolean, default true)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can manage their own bookings
    - Reviews are publicly readable, restricted creation
*/

-- Create booking status enum
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  renter_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  start_time time,
  duration_days integer NOT NULL CHECK (duration_days > 0),
  total_price numeric(10,2) NOT NULL CHECK (total_price >= 0),
  payment_method text NOT NULL,
  status booking_status DEFAULT 'pending',
  special_instructions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Ensure end_date is after start_date
  CONSTRAINT valid_date_range CHECK (end_date >= start_date),
  -- Prevent self-booking
  CONSTRAINT no_self_booking CHECK (renter_id != owner_id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  resource_id uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_verified boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure one review per booking per reviewer
  UNIQUE(booking_id, reviewer_id)
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = renter_id OR auth.uid() = owner_id);

CREATE POLICY "Users can create bookings for others' resources"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = renter_id AND auth.uid() != owner_id);

CREATE POLICY "Owners and renters can update booking status"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = renter_id OR auth.uid() = owner_id);

-- Policies for reviews
CREATE POLICY "Reviews are publicly readable"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews for their bookings"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE id = booking_id 
      AND (renter_id = auth.uid() OR owner_id = auth.uid())
      AND status = 'completed'
    )
  );

-- Add updated_at trigger to bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookings_resource_id ON bookings(resource_id);
CREATE INDEX IF NOT EXISTS idx_bookings_renter_id ON bookings(renter_id);
CREATE INDEX IF NOT EXISTS idx_bookings_owner_id ON bookings(owner_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_reviews_resource_id ON reviews(resource_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewee_id ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Function to update resource and profile ratings
CREATE OR REPLACE FUNCTION update_ratings_after_review()
RETURNS trigger AS $$
BEGIN
  -- Update resource rating
  UPDATE resources 
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 2) 
      FROM reviews 
      WHERE resource_id = NEW.resource_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE resource_id = NEW.resource_id
    )
  WHERE id = NEW.resource_id;
  
  -- Update profile rating for reviewee
  UPDATE profiles 
  SET 
    rating = (
      SELECT ROUND(AVG(rating)::numeric, 2) 
      FROM reviews 
      WHERE reviewee_id = NEW.reviewee_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE reviewee_id = NEW.reviewee_id
    )
  WHERE id = NEW.reviewee_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update ratings after review
CREATE TRIGGER update_ratings_after_review_trigger
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_ratings_after_review();