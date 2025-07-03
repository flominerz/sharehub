import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import StorageErrorNotification from './components/StorageErrorNotification'
import SupabaseDebugPanel from './components/SupabaseDebugPanel'
import Header from './components/Header'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ResourceDetails from './pages/ResourceDetails'
import Map from './pages/Map'
import Calendar from './pages/Calendar'
import Profile from './pages/Profile'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Help from './pages/Help'
import Contact from './pages/Contact'
import Safety from './pages/Safety'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/resource/:id" element={<ResourceDetails />} />
                <Route path="/map" element={<Map />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/safety" element={<Safety />} />
              </Routes>
            </main>
            <StorageErrorNotification />
            {/* Debug panel - only shows in development */}
            {import.meta.env.DEV && <SupabaseDebugPanel />}
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App