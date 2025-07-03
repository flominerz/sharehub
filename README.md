# ShareHub - Resource Sharing Platform

A modern resource sharing platform built with React, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Features

- **User Authentication** - Secure sign-in with Google OAuth and email/password
- **Multilingual Support** - English and German language support
- **Resource Marketplace** - Browse and book resources from the community
- **Interactive Map** - View available resources on a map with Leaflet
- **Calendar Integration** - Manage bookings and availability
- **User Profiles** - Manage your resources and view statistics
- **Real-time Database** - Powered by Supabase with PostgreSQL
- **Responsive Design** - Works seamlessly on all devices

## 🚀 Live Demo

Visit the live application: [https://shimmering-dragon-d3b4f6.netlify.app](https://shimmering-dragon-d3b4f6.netlify.app)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Google OAuth
- **Maps**: Leaflet with React Leaflet
- **Internationalization**: React i18next
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud Console account (for OAuth)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/sharehub.git
cd sharehub
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Configure your environment variables in `.env`:**
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

5. **Set up Supabase database**
   - Follow the detailed setup guide in `SUPABASE_SETUP.md`
   - Run the migration files in the `supabase/migrations/` directory

6. **Start the development server**
```bash
npm run dev
```

## 🗄️ Database Setup

This project uses Supabase as the backend database. Follow these steps:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Run the migrations** in order from the `supabase/migrations/` directory
3. **Configure authentication** providers in the Supabase dashboard
4. **Update environment variables** with your project credentials

For detailed instructions, see `SUPABASE_SETUP.md`.

## 🔐 Authentication Setup

### Google OAuth Configuration

1. **Create Google Cloud Project**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable APIs**:
   - Go to "APIs & Services" > "Library"
   - Search for and enable "Google+ API"

3. **Create OAuth Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized origins:
     - `http://localhost:5173` (for development)
     - Your production domain

4. **Configure Supabase**:
   - Go to Authentication → Settings → Auth Providers in Supabase
   - Enable Google provider
   - Add your Google OAuth credentials

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── Header.tsx      # Main navigation header
│   ├── UserMenu.tsx    # User dropdown menu
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Profile.tsx     # User profile/dashboard
│   ├── Marketplace.tsx # Resource marketplace
│   └── ...
├── lib/               # Utilities and configurations
│   └── supabase.ts    # Supabase client configuration
├── i18n/              # Internationalization
│   └── locales/       # Translation files
└── ...
```

## 🌐 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

The application is configured for easy deployment on Netlify:

1. **Connect your GitHub repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Deploy** - Netlify will automatically build and deploy

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🌍 Internationalization

The application supports multiple languages:

- **English** (default)
- **German**

To add a new language:
1. Create a new translation file in `src/i18n/locales/`
2. Add the language to the language switcher component
3. Update the i18n configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/sharehub/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Leaflet](https://leafletjs.com/) - Interactive maps
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Pexels](https://pexels.com/) - Stock photos

---

Built with ❤️ by the ShareHub team