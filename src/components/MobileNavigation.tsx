import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Store, Map, Calendar, BarChart3, Home } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'

const MobileNavigation = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  const navItems = [
    { path: '/', label: t('navigation.home'), icon: Home },
    { path: '/marketplace', label: t('navigation.marketplace'), icon: Store },
    { path: '/map', label: t('navigation.map'), icon: Map },
    { path: '/calendar', label: t('navigation.calendar'), icon: Calendar },
    ...(user ? [{ path: '/profile', label: t('navigation.dashboard'), icon: BarChart3 }] : [])
  ]

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <nav className="p-4">
              <div className="space-y-2">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={toggleMenu}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      location.pathname === path
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNavigation