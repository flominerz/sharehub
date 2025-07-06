import { useState, useRef, useEffect } from 'react'
import { User, Settings, Calendar, Heart, LogOut, ChevronDown, Camera } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import ProfileEditModal from './ProfileEditModal'

const UserMenu = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileEdit, setShowProfileEdit] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMenuClick = (action: string) => {
    setIsOpen(false)
    switch (action) {
      case 'profile':
        navigate('/profile')
        break
      case 'calendar':
        navigate('/calendar')
        break
      case 'favorites':
        alert('Favorites feature coming soon!')
        break
      case 'edit-profile':
        setShowProfileEdit(true)
        break
      case 'settings':
        alert('Settings feature coming soon!')
        break
      case 'signout':
        signOut()
        navigate('/')
        break
    }
  }

  if (!user) return null

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-orange-600" />
            </div>
          )}
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {user.name.split(' ')[0]}
          </span>
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-orange-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={() => handleMenuClick('profile')}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>{t('navigation.profile')}</span>
              </button>
              
              <button
                onClick={() => handleMenuClick('edit-profile')}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Camera className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              
              <button
                onClick={() => handleMenuClick('calendar')}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>{t('profile.viewBookings')}</span>
              </button>
              
              <button
                onClick={() => handleMenuClick('favorites')}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Heart className="h-4 w-4" />
                <span>Favorites</span>
              </button>
              
              <button
                onClick={() => handleMenuClick('settings')}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>{t('profile.settings')}</span>
              </button>
            </div>

            {/* Sign Out */}
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => handleMenuClick('signout')}
                className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('navigation.signOut')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
      />
    </>
  )
}

export default UserMenu