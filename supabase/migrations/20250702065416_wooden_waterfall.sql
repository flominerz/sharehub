/*
  # Resource Management Tables

  1. New Tables
    - `categories` - Resource categories
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `icon` (text, optional)
      - `created_at` (timestamptz)

    - `resources` - User-listed resources
      - `id` (uuid, primary key)
      - `owner_id` (uuid, references profiles)
      - `category_id` (uuid, references categories)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `price_type` (text, enum: hour/day/week/service)
      - `location` (text)
      - `latitude` (numeric, optional)
      - `longitude` (numeric, optional)
      - `is_available` (boolean, default true)
      - `features` (text array, optional)
      - `images` (text array, optional)
      - `rating` (numeric, default 0)
      - `total_reviews` (integer, default 0)
      - `total_bookings` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Categories are publicly readable
    - Resources are publicly readable, owner-manageable
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

-- Create price_type enum
CREATE TYPE price_type AS ENUM ('hour', 'day', 'week', 'service');

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  price_type price_type NOT NULL DEFAULT 'day',
  location text NOT NULL,
  latitude numeric(10,8),
  longitude numeric(11,8),
  is_available boolean DEFAULT true,
  features text[],
  images text[],
  rating numeric(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews integer DEFAULT 0 CHECK (total_reviews >= 0),
  total_bookings integer DEFAULT 0 CHECK (total_bookings >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Categories are publicly readable"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for resources
CREATE POLICY "Resources are publicly readable"
  ON resources
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own resources"
  ON resources
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own resources"
  ON resources
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own resources"
  ON resources
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Add updated_at trigger to resources
CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resources_owner_id ON resources(owner_id);
CREATE INDEX IF NOT EXISTS idx_resources_category_id ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_location ON resources USING gin(to_tsvector('english', location));
CREATE INDEX IF NOT EXISTS idx_resources_name_description ON resources USING gin(to_tsvector('english', name || ' ' || description));
CREATE INDEX IF NOT EXISTS idx_resources_available ON resources(is_available) WHERE is_available = true;
CREATE INDEX IF NOT EXISTS idx_resources_rating ON resources(rating DESC);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at DESC);