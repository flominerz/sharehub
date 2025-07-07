# ShareHub Data Migration Guide

## Overview

This document provides a comprehensive guide for migrating sample data from the ShareHub frontend components into the Supabase database. The migration includes all mock data currently used in the application and transforms it into a properly structured database format.

## Migration Components

### 1. Source Data Analysis

The migration extracts sample data from the following frontend components:

- **Categories**: From `useCategories.ts` fallback data
- **Resources**: From `Marketplace.tsx` and `ResourceDetails.tsx`
- **Users/Profiles**: Generated realistic profiles for resource owners
- **Bookings**: From `Calendar.tsx` sample data
- **Reviews**: From `ResourceDetails.tsx` sample reviews
- **Conversations & Messages**: Sample communication data
- **Favorites**: Sample user preferences

### 2. Data Transformations Applied

#### Price Conversions
- Frontend: String format (`"$5/day"`)
- Database: Numeric format (`5.00`) with separate `price_type` field

#### Date Standardization
- Frontend: Various date formats
- Database: ISO 8601 timestamps with timezone

#### ID Generation
- Frontend: Simple numeric IDs
- Database: UUID format for all entities

#### Relationship Mapping
- Established proper foreign key relationships
- Created realistic user profiles for all resource owners
- Linked bookings, reviews, and conversations appropriately

### 3. Database Schema Compatibility

The migration is designed to work with the existing ShareHub database schema:

```sql
-- Core tables populated:
- profiles (8 sample users)
- categories (6 categories)
- resources (8 sample resources)
- bookings (3 sample bookings)
- reviews (3 sample reviews)
- conversations (2 sample conversations)
- messages (4 sample messages)
- favorites (3 sample favorites)
```

## Migration Execution

### Prerequisites

1. **Supabase Project Setup**
   - Active Supabase project
   - Database schema already created
   - Environment variables configured

2. **Required Permissions**
   - Database write access
   - Ability to run SQL migrations

### Step 1: Run the Migration

Execute the migration SQL file in your Supabase SQL Editor:

```bash
# File: supabase/migrations/20250707070000_seed_sample_data.sql
```

### Step 2: Validate the Migration

Run the validation script to ensure data integrity:

```bash
cd scripts
node data-migration-validator.js
```

### Step 3: Verify Results

Check the migration results in your Supabase dashboard:

1. **Profiles Table**: Should contain 8 sample users
2. **Resources Table**: Should contain 8 sample resources
3. **Categories Table**: Should contain 6 categories
4. **Bookings Table**: Should contain 3 sample bookings
5. **Reviews Table**: Should contain 3 sample reviews

## Data Validation

### Automated Checks

The validation script performs the following checks:

1. **Record Counts**: Verifies expected number of records in each table
2. **Foreign Key Integrity**: Ensures all relationships are valid
3. **Data Consistency**: Validates calculated fields (ratings, review counts)
4. **Business Rules**: Checks domain-specific constraints
5. **Data Types**: Validates format and constraints

### Manual Verification

After migration, manually verify:

1. **Resource Listings**: Check that resources appear in the marketplace
2. **User Profiles**: Verify profile information is complete
3. **Booking History**: Confirm bookings are properly linked
4. **Review System**: Test that reviews display correctly

## Rollback Procedures

### Automatic Rollback

If the migration fails, use the rollback script:

```sql
-- File: scripts/rollback-migration.sql
```

### Manual Rollback

To manually remove sample data:

```sql
-- Delete in dependency order
DELETE FROM favorites WHERE id LIKE 'fav-550e8400%';
DELETE FROM messages WHERE id LIKE 'msg-550e8400%';
DELETE FROM conversations WHERE id LIKE 'conv-550e8400%';
DELETE FROM reviews WHERE id LIKE 'rev-550e8400%';
DELETE FROM bookings WHERE id LIKE 'book-550e8400%';
DELETE FROM resources WHERE id LIKE 'res-550e8400%';
DELETE FROM categories WHERE id LIKE 'cat-550e8400%';
DELETE FROM profiles WHERE id LIKE '550e8400%';
```

## Error Handling

### Common Issues

1. **Foreign Key Violations**
   - Cause: Incorrect dependency order
   - Solution: Run rollback and retry with correct order

2. **Duplicate Key Errors**
   - Cause: Migration run multiple times
   - Solution: Run rollback first, then re-run migration

3. **Data Type Mismatches**
   - Cause: Schema changes since migration creation
   - Solution: Update migration to match current schema

### Troubleshooting

1. **Check Supabase Logs**: Review SQL execution logs
2. **Validate Schema**: Ensure database schema matches expectations
3. **Test Connections**: Verify database connectivity
4. **Review Permissions**: Check RLS policies and user permissions

## Post-Migration Steps

### 1. Update Frontend Configuration

After successful migration, update the frontend to use real data:

```typescript
// In useResources.ts and other hooks
// Remove fallback mock data
// Ensure proper error handling for database queries
```

### 2. Test Application Features

Verify that all features work with the migrated data:

- [ ] User authentication and profiles
- [ ] Resource browsing and search
- [ ] Booking creation and management
- [ ] Review system
- [ ] Messaging functionality
- [ ] Favorites management

### 3. Performance Optimization

Monitor and optimize database performance:

- Check query execution times
- Verify indexes are being used
- Monitor RLS policy performance
- Consider adding additional indexes if needed

## Data Maintenance

### Regular Tasks

1. **Backup Verification**: Ensure backups include sample data
2. **Performance Monitoring**: Track query performance
3. **Data Cleanup**: Remove test data periodically
4. **Schema Updates**: Keep migration scripts updated with schema changes

### Monitoring

Set up monitoring for:

- Database connection health
- Query performance metrics
- Error rates and types
- Data integrity checks

## Security Considerations

### Data Privacy

- Sample data uses fictional information
- No real personal data is included
- Email addresses use example.com domain

### Access Control

- RLS policies apply to all migrated data
- Sample users cannot access real user data
- Proper authentication required for all operations

## Conclusion

This migration provides a solid foundation of sample data for development and testing. The data is realistic, properly structured, and follows all database constraints and business rules.

For questions or issues with the migration, refer to the troubleshooting section or check the validation report generated by the validation script.