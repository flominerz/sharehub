import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Share2, Map, Calendar, BarChart3, Store } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'
import UserMenu from './UserMenu'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const location = useLocation()
  const { user, isLoading } = useAuth()
  const { t } = useTranslation()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')

  const getNavItems = () => {
    const baseItems = [
      { path: '/', label: t('navigation.home'), icon: null },
      { path: '/marketplace', label: t('navigation.marketplace'), icon: Store },
      { path: '/map', label: t('navigation.map'), icon: Map },
      { path: '/calendar', label: t('navigation.calendar'), icon: Calendar },
    ]

    // Only show Dashboard/Profile if user is authenticated
    if (user) {
      baseItems.push({ path: '/profile', label: t('navigation.dashboard'), icon: BarChart3 })
    }

    return baseItems
  }

  const navItems = getNavItems()

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Share2 className="h-8 w-8 text-orange-500" />
                <span className="text-xl font-bold text-gray-900">ShareHub</span>
              </Link>
            </div>
            
            <nav className="flex items-center space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{label}</span>
                </Link>
              ))}
              
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Authentication Section */}
              {isLoading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent"></div>
              ) : user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('signin')}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {t('navigation.signIn')}
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    {t('navigation.signUp')}
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}

export default Header