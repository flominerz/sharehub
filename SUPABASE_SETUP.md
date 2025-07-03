# ShareHub Supabase Database Setup Guide

## Prerequisites

1. **Supabase Account**: Create an account at [supabase.com](https://supabase.com)
2. **New Project**: Create a new Supabase project
3. **Environment Variables**: Get your project URL and anon key

## Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `ShareHub`
   - Database Password: (generate a secure password)
   - Region: (choose closest to your users)
5. Click "Create new project"

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**To find your credentials:**
- Go to Project Settings → API
- Copy the "Project URL" and "anon public" key

## Step 3: Run Database Migrations

Execute the migration files in order in the Supabase SQL Editor:

1. **001_create_users_and_auth.sql** - User profiles and authentication
2. **002_create_categories_and_resources.sql** - Categories and resources
3. **003_create_bookings_and_reviews.sql** - Bookings and reviews system
4. **004_create_messages_and_favorites.sql** - Messaging and favorites
5. **005_seed_initial_data.sql** - Initial data and utility functions

**How to run migrations:**
1. Go to SQL Editor in Supabase Dashboard
2. Copy and paste each migration file content
3. Click "Run" for each migration
4. Verify no errors occurred

## Step 4: Configure Authentication

### Email Authentication (Default)
- Go to Authentication → Settings
- Enable "Enable email confirmations" if desired
- Configure email templates if needed

### Google OAuth (Optional)
1. Go to Authentication → Settings → Auth Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID: (from Google Cloud Console)
   - Client Secret: (from Google Cloud Console)
4. Add authorized redirect URLs:
   - `https://your-project-ref.supabase.co/auth/v1/callback`

## Step 5: Set Up Row Level Security

All tables have RLS enabled by default with the following policies:

### Profiles
- ✅ Users can read all profiles (public info)
- ✅ Users can update their own profile
- ✅ Auto-created on user registration

### Resources
- ✅ Public read access to all resources
- ✅ Users can create/update/delete their own resources

### Bookings
- ✅ Users can view bookings they're involved in
- ✅ Users can create bookings for others' resources
- ✅ Owners and renters can update booking status

### Reviews
- ✅ Public read access to all reviews
- ✅ Users can review completed bookings they participated in

### Messages & Conversations
- ✅ Users can only access their own conversations
- ✅ Users can send messages in their conversations

### Favorites
- ✅ Users can manage their own favorites only

## Step 6: Install Dependencies

Add Supabase client to your project:

```bash
npm install @supabase/supabase-js
```

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Try creating an account
3. Test basic functionality:
   - User registration/login
   - Creating a resource
   - Browsing resources
   - Making a booking

## Database Schema Overview

### Core Tables

1. **profiles** - Extended user information
2. **categories** - Resource categories (Tools, Skills, etc.)
3. **resources** - User-listed shareable items/services
4. **bookings** - Resource reservation records
5. **reviews** - User feedback and ratings
6. **conversations** - Message threads between users
7. **messages** - Individual messages
8. **favorites** - User's saved resources

### Key Features

- **Automatic Rating Updates**: Reviews automatically update resource and user ratings
- **Search Functionality**: Full-text search across resources
- **Conversation Management**: Automatic conversation creation
- **Data Integrity**: Foreign key constraints and check constraints
- **Performance**: Optimized indexes for common queries
- **Security**: Comprehensive RLS policies

## Troubleshooting

### Common Issues

1. **Migration Errors**
   - Ensure migrations are run in order
   - Check for syntax errors in SQL
   - Verify all dependencies are met

2. **Authentication Issues**
   - Verify environment variables are correct
   - Check Supabase project settings
   - Ensure RLS policies are properly configured

3. **Permission Errors**
   - Review RLS policies
   - Check user authentication status
   - Verify user IDs match policy conditions

### Getting Help

- Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Review SQL logs in Supabase Dashboard
- Test queries in SQL Editor
- Check browser console for client-side errors

## Production Considerations

1. **Backup Strategy**: Set up automated backups
2. **Performance Monitoring**: Monitor query performance
3. **Security Review**: Audit RLS policies regularly
4. **Scaling**: Consider read replicas for high traffic
5. **Monitoring**: Set up alerts for errors and performance issues

## Next Steps

After setting up the database:

1. Update the frontend to use Supabase instead of mock data
2. Implement real-time features using Supabase subscriptions
3. Add file upload for resource images
4. Implement push notifications
5. Add analytics and monitoring