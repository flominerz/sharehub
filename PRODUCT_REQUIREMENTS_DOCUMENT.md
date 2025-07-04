# Product Requirements Document: ShareHub

## 1. Introduction

ShareHub is a modern, community-focused resource-sharing platform designed to connect individuals and enable them to share and book various resources, skills, and spaces. Built with React, TypeScript, Tailwind CSS, and Supabase, ShareHub aims to foster a collaborative economy, reduce waste, and provide cost-effective access to a wide range of assets. This document outlines the features and functionalities of the ShareHub platform as currently implemented.

**Purpose of this Document:** To provide a comprehensive overview of the ShareHub application's existing features, target audience, user needs, and technical architecture. This will serve as a reference for understanding the current state of the product.

## 2. Goals

*   **Enable Resource Sharing:** Allow users to easily list their own resources and discover resources shared by others in their community.
*   **Facilitate Booking & Scheduling:** Provide a seamless system for users to book resources and manage their availability through an integrated calendar.
*   **Foster Community Building:** Create a platform that encourages interaction and trust between users.
*   **Promote Sustainability:** Encourage the efficient use of resources, thereby reducing waste and overconsumption.
*   **Provide a User-Friendly Experience:** Offer an intuitive, responsive, and accessible interface across all devices.
*   **Support Multiple Languages:** Cater to a diverse user base by offering multilingual support (initially English and German).

## 3. Target Audience

*   **Community Members:** Individuals looking to access items, skills, or spaces they need temporarily without purchasing them.
*   **Resource Owners:** Individuals who have underutilized resources (tools, equipment, vehicles, spaces) and wish to monetize them or share them with their community.
*   **Service Providers:** Individuals offering skills or services (e.g., lessons, repairs, labor) who want to reach a local audience.
*   **Eco-conscious Users:** Individuals interested in participating in a sharing economy to reduce their environmental footprint.
*   **Budget-conscious Users:** Individuals seeking cost-effective alternatives to buying or renting through traditional channels.

## 4. User Stories

**User Registration & Authentication:**

*   As a new user, I want to sign up using my Google account so I can quickly access the platform.
*   As a new user, I want to sign up using my email and password so I can create an account if I don't use Google.
*   As an existing user, I want to sign in using my Google account for easy access.
*   As an existing user, I want to sign in using my email and password.
*   As a logged-in user, I want to easily log out of my account to ensure my privacy.

**Resource Discovery & Browsing:**

*   As a user, I want to browse a marketplace of available resources so I can find what I need.
*   As a user, I want to search for specific resources by keywords (name, description, category) to quickly find relevant items.
*   As a user, I want to filter resources by category (e.g., Tools, Skills, Spaces) to narrow down my search.
*   As a user, I want to sort resources by criteria like newest, price, rating, or distance to find the best options for me.
*   As a user, I want to view resources on an interactive map to see what's available near my location.
*   As a user, I want to view detailed information about a resource, including multiple images, full description, features, price, and owner details, before deciding to book.
*   As a user, I want to see reviews and ratings for resources and their owners to build trust.

**Booking & Scheduling:**

*   As a user, I want to book an available resource for a specific date and time.
*   As a user, I want to specify the duration for my booking.
*   As a user (resource seeker), I want to manage my upcoming and past bookings in a personal calendar view.
*   As a user (resource seeker), I want to cancel my bookings if my plans change (subject to cancellation policies, TBD).
*   As a user (resource owner), I want to manage the availability of my listed resources.

**User Profile & Resource Management (for Resource Owners):**

*   As a logged-in user, I want to view and edit my profile information.
*   As a resource owner, I want to add new resources I own to the platform, including details like name, category, description, price, location, and photos.
*   As a resource owner, I want to manage my listed resources (edit details, update availability, remove listing).
*   As a resource owner, I want to see statistics about my shared resources (e.g., number of bookings, earnings - currently mocked).

**General User Experience:**

*   As a user, I want to switch the platform's language (English/German) to my preference.
*   As a user, I want to easily navigate the platform through a clear header and footer.
*   As a user, I want to add resources to a list of favorites for easy access later.
*   As a user, I want to share a resource's details with others via a shareable link.

## 5. Features

### 5.1. Core Platform Features

*   **User Authentication:**
    *   Sign-up with Google OAuth.
    *   Sign-up with email and password (currently mocked in `AuthContext`, Supabase integration available in `authService`).
    *   Sign-in with Google OAuth.
    *   Sign-in with email and password (currently mocked, Supabase integration available).
    *   Secure session management (persisted via `StorageManager`).
    *   User logout.
*   **Resource Marketplace (`/marketplace`):**
    *   Grid and List view for resources.
    *   Search functionality (keywords).
    *   Filtering by category (Tools, Skills, Vehicles, Spaces, Services, Equipment).
    *   Sorting options (Newest, Price Low-High, Price High-Low, Highest Rated, Nearest First).
    *   Resource cards displaying key information (image, name, category, price, distance, owner, rating, availability).
    *   "Book Now" action leading to a booking modal.
    *   Favorite functionality (client-side state).
*   **Resource Details Page (`/resource/:id`):**
    *   Detailed view of a single resource.
    *   Image gallery with main image and thumbnails.
    *   Comprehensive information: name, category, location, distance, rating, reviews, full description, features.
    *   Pricing and availability status.
    *   "Book Now" button or "Currently Unavailable" status.
    *   Favorite and Share buttons.
    *   Information about the resource owner (name, rating, reviews, response time, joined date - mostly mocked).
    *   Section for user reviews of the resource.
*   **Interactive Map View (`/map`):**
    *   Powered by Leaflet.
    *   Displays resources as markers on a map based on their coordinates (sample data).
    *   Sidebar with a filterable list of resources.
    *   Marker popups with resource summaries and "Book Now" option.
    *   Selected resource details panel.
*   **Calendar Integration (`/calendar`):**
    *   Monthly calendar view for users to manage their bookings.
    *   Navigation between months.
    *   Visual indicators for days with bookings.
    *   Display of booking details for a selected date (resource name, time, duration, status).
    *   Ability to cancel bookings (client-side state update).
    *   "Reschedule" option (placeholder).
    *   List of upcoming bookings.
*   **User Profile & Dashboard (`/profile`):**
    *   Requires authentication.
    *   Displays user information (avatar, name, email, mocked member since/rating).
    *   Mocked statistics (items shared, bookings made, tokens earned).
    *   Quick actions: Add Resource, View Bookings, (placeholder) Reviews, (placeholder) Settings.
    *   "My Resources" section:
        *   List of resources shared by the user (mocked).
        *   Actions: Edit (placeholder), Delete (client-side), Toggle Status (Active/Inactive, client-side).
    *   Modal to add new resources (`AddResourceModal`).

### 5.2. Supporting Features

*   **Multilingual Support:**
    *   English and German languages supported.
    *   Language detection and manual switching via `LanguageSwitcher` component.
    *   Uses `i18next` and `react-i18next`.
*   **Responsive Design:** The platform is designed to work seamlessly across various devices (desktop, tablet, mobile).
*   **Modals:**
    *   `AuthModal`: For sign-in and sign-up.
    *   `BookingModal`: For initiating resource booking.
    *   `AddResourceModal`: For adding new resources to share.
*   **Navigation:**
    *   Global `Header` with main navigation links.
    *   `Footer` with links to informational pages and platform sections.
*   **Notifications:**
    *   `StorageErrorNotification`: Informs users about issues with local storage.
*   **Developer Tools:**
    *   `SupabaseDebugPanel`: For verifying Supabase integration during development.

## 6. Design Considerations

*   **User Interface (UI):**
    *   Clean, modern, and intuitive design using Tailwind CSS.
    *   Emphasis on visual elements like resource images and icons (Lucide React).
    *   Consistent branding with an orange theme color.
*   **User Experience (UX):**
    *   Streamlined flows for key actions like searching, booking, and listing resources.
    *   Clear calls to action.
    *   Responsive feedback for user interactions (loading states, confirmations).
    *   Prioritization of mobile-first or responsive design principles.

## 7. Technical Considerations

### 7.1. Frontend

*   **Framework/Library:** React 18 with TypeScript.
*   **Build Tool:** Vite.
*   **Styling:** Tailwind CSS.
*   **State Management:** React Context API (e.g., `AuthContext`). Local component state (`useState`).
*   **Routing:** React Router DOM.
*   **Internationalization:** `i18next`, `react-i18next`.
*   **Mapping:** Leaflet, React Leaflet.
*   **Icons:** Lucide React.
*   **Date Handling:** `date-fns`.
*   **Local Storage:** Custom `StorageManager` utility for robust local storage interaction.

### 7.2. Backend (Supabase)

*   **Database:** PostgreSQL provided by Supabase. (Schema includes tables like `profiles`, others inferred for resources, bookings, etc.).
*   **Authentication:** Supabase Auth (Google OAuth, Email/Password).
    *   *Note:* Current frontend `AuthContext` uses a mix of direct Google SDK and mocked email/password auth. `lib/authService.ts` provides full Supabase auth integration, which is the likely target.
*   **Real-time Capabilities:** Supabase offers real-time database features, though current implementation status of real-time updates is not fully detailed in frontend code.
*   **Storage:** Supabase Storage (likely for user-uploaded resource images, though not explicitly implemented in `AddResourceModal`'s current logic).

### 7.3. Deployment

*   Configured for Netlify deployment (as per `README.md`).

## 8. Future Considerations (Potential Enhancements - Not Current Features)

*   **Full Supabase Auth Integration:** Migrate all authentication flows in `AuthContext` to use `lib/authService.ts` for a unified Supabase backend.
*   **Real-time Updates:** Implement real-time updates for resource availability, new bookings, and notifications.
*   **Payment Integration:** Integrate a real payment gateway for transactions beyond mocked "ShareHub Tokens."
*   **User-to-User Messaging:** Allow users to communicate directly regarding bookings or resources. (Evidence of `StorageManager` chat methods suggests this might have been planned).
*   **Advanced Search & Filtering:** More granular search filters (e.g., price range, specific features, availability dates).
*   **Review System Enhancements:** Allow users to submit reviews for resources and owners.
*   **Notification System:** In-app and email notifications for booking confirmations, reminders, messages, etc.
*   **Admin Panel:** For platform management and moderation.
*   **User Verification:** More robust owner/user verification processes.
*   **Cancellation Policies:** Implement and enforce cancellation rules.
*   **Image Uploads:** Fully implement image uploading to Supabase Storage when adding resources.

## 9. Success Metrics (Proposed for Current Features)

*   **User Engagement:**
    *   Daily Active Users (DAU) / Monthly Active Users (MAU).
    *   Average session duration.
    *   Number of searches performed per user session.
    *   Number of resource detail pages viewed.
    *   User retention rate.
*   **Resource Sharing & Booking Activity:**
    *   Number of new resources listed per week/month.
    *   Total number of active listings.
    *   Number of bookings made per week/month.
    *   Booking completion rate (bookings made vs. completed).
    *   Average resource rating.
    *   Utilization rate of listed resources (percentage of time booked).
*   **Platform Growth:**
    *   New user sign-ups per week/month.
    *   Conversion rate from visitor to registered user.
    *   Growth in the number of listed resources.
*   **Community & Trust:**
    *   Number of reviews submitted (once fully implemented).
    *   Ratio of positive to negative reviews.
    *   Usage of "Favorite" feature.

---
This document reflects the features and state of the ShareHub application based on the provided codebase.
