/*
  # ShareHub Data Migration Rollback Script
  
  This script provides a safe way to rollback the sample data migration
  while preserving the database schema and any real user data.
  
  WARNING: This will delete all sample data inserted by the migration.
  Make sure to backup any important data before running this script.
*/

-- Start transaction for safe rollback
BEGIN;

-- Log the rollback operation
DO $$
BEGIN
  RAISE NOTICE 'Starting ShareHub sample data rollback...';
  RAISE NOTICE 'Timestamp: %', now();
END $$;

-- Delete sample data in reverse dependency order to avoid foreign key violations

-- 1. Delete favorites (no dependencies)
DELETE FROM favorites WHERE id LIKE 'fav-550e8400-e29b-41d4-a716-446655440%';

-- 2. Delete messages (depends on conversations)
DELETE FROM messages WHERE id LIKE 'msg-550e8400-e29b-41d4-a716-446655440%';

-- 3. Delete conversations (depends on profiles and resources)
DELETE FROM conversations WHERE id LIKE 'conv-550e8400-e29b-41d4-a716-446655440%';

-- 4. Delete reviews (depends on bookings, resources, profiles)
DELETE FROM reviews WHERE id LIKE 'rev-550e8400-e29b-41d4-a716-446655440%';

-- 5. Delete bookings (depends on resources and profiles)
DELETE FROM bookings WHERE id LIKE 'book-550e8400-e29b-41d4-a716-446655440%';

-- 6. Delete resources (depends on profiles and categories)
DELETE FROM resources WHERE id LIKE 'res-550e8400-e29b-41d4-a716-446655440%';

-- 7. Delete categories (may have resource dependencies, but we've already deleted resources)
DELETE FROM categories WHERE id LIKE 'cat-550e8400-e29b-41d4-a716-446655440%';

-- 8. Delete sample profiles (should be last due to many dependencies)
DELETE FROM profiles WHERE id LIKE '550e8400-e29b-41d4-a716-446655440%';

-- Verify rollback
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
  -- Count remaining sample data
  SELECT COUNT(*) INTO profile_count FROM profiles WHERE id LIKE '550e8400-e29b-41d4-a716-446655440%';
  SELECT COUNT(*) INTO category_count FROM categories WHERE id LIKE 'cat-550e8400-e29b-41d4-a716-446655440%';
  SELECT COUNT(*) INTO resource_count FROM resources WHERE id LIKE 'res-550e8400-e29b-41d4-a716-446655440%';
  SELECT COUNT(*) INTO booking_count FROM bookings WHERE id LIKE 'book-550e8400-e29b-41d4-a716-446655440%';
  SELECT COUNT(*) INTO review_count FROM reviews WHERE id LIKE 'rev-550e8400-e29b-41d4-a716-446655440%';
  SELECT COUNT(*) INTO conversation_count FROM conversations WHERE id LIKE 'conv-550e8400-e29b-41d4-a716-446655440%';
  SELECT COUNT(*) INTO message_count FROM messages WHERE id LIKE 'msg-550e8400-e29b-41d4-a716-446655440%';
  SELECT COUNT(*) INTO favorite_count FROM favorites WHERE id LIKE 'fav-550e8400-e29b-41d4-a716-446655440%';
  
  -- Report results
  RAISE NOTICE 'Rollback verification:';
  RAISE NOTICE 'Remaining sample profiles: %', profile_count;
  RAISE NOTICE 'Remaining sample categories: %', category_count;
  RAISE NOTICE 'Remaining sample resources: %', resource_count;
  RAISE NOTICE 'Remaining sample bookings: %', booking_count;
  RAISE NOTICE 'Remaining sample reviews: %', review_count;
  RAISE NOTICE 'Remaining sample conversations: %', conversation_count;
  RAISE NOTICE 'Remaining sample messages: %', message_count;
  RAISE NOTICE 'Remaining sample favorites: %', favorite_count;
  
  IF (profile_count + category_count + resource_count + booking_count + 
      review_count + conversation_count + message_count + favorite_count) = 0 THEN
    RAISE NOTICE '✅ Rollback completed successfully! All sample data removed.';
  ELSE
    RAISE WARNING '⚠️ Some sample data may still remain. Please review manually.';
  END IF;
END $$;

-- Commit the rollback transaction
COMMIT;

-- Reset sequences if needed (optional)
-- This ensures that new data won't conflict with the removed sample data
DO $$
BEGIN
  RAISE NOTICE 'Rollback completed at: %', now();
  RAISE NOTICE 'Database schema preserved, only sample data removed.';
END $$;