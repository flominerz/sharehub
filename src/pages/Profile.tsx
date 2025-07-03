import { useState } from 'react'
import { User, Star, Calendar, Settings, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import AddResourceModal from '../components/AddResourceModal'
import Footer from '../components/Footer'

const Profile = () => {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [addResourceModalOpen, setAddResourceModalOpen] = useState(false)
  const [userResources, setUserResources] = useState([
    { id: 1, name: 'Power Drill', status: 'Active', price: '$5/day' },
    { id: 2, name: 'Ladder', status: 'Active', price: '$8/day' },
    { id: 3, name: 'Guitar Lessons', status: 'Active', price: '$25/hour' },
    { id: 4, name: 'Parking Space', status: 'Booked', price: '$10/day' }
  ])
  
  const navigate = useNavigate()

  // Redirect to home if not authenticated
  if (!user) {
    navigate('/')
    return null
  }

  const handleAddResource = (resourceData: any) => {
    setUserResources([...userResources, {
      id: resourceData.id,
      name: resourceData.name,
      status: 'Active',
      price: `$${resourceData.price}/${resourceData.priceType}`
    }])
    alert(t('profile.resourceAddedSuccess'))
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-resource':
        setAddResourceModalOpen(true)
        break
      case 'view-bookings':
        navigate('/calendar')
        break
      case 'reviews':
        alert(t('profile.reviewsFeatureComingSoon'))
        break
      case 'settings':
        alert(t('profile.settingsFeatureComingSoon'))
        break
    }
  }

  const handleResourceAction = (resourceId: number, action: string) => {
    switch (action) {
      case 'edit':
        alert(t('profile.editResourceComingSoon', { id: resourceId }))
        break
      case 'delete':
        if (confirm(t('profile.deleteResourceConfirm'))) {
          setUserResources(userResources.filter(r => r.id !== resourceId))
          alert(t('profile.resourceDeletedSuccess'))
        }
        break
      case 'toggle-status':
        setUserResources(userResources.map(r => 
          r.id === resourceId 
            ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' }
            : r
        ))
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-orange-600" />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{t('profile.memberSince', { date: 'January 2024' })}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">4.8 (24 {t('marketplace.reviews')})</span>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => handleQuickAction('settings')}
                  className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile Stats */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userResources.length}</div>
                <div className="text-sm text-gray-600">{t('profile.itemsShared')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">28</div>
                <div className="text-sm text-gray-600">{t('profile.bookingsMade')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-600">{t('profile.tokensEarned')}</div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.quickActions')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => handleQuickAction('add-resource')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-orange-300 transition-all group"
              >
                <Plus className="h-6 w-6 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700 group-hover:text-orange-600">{t('profile.addResource')}</span>
              </button>
              <button 
                onClick={() => handleQuickAction('view-bookings')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all group"
              >
                <Calendar className="h-6 w-6 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700 group-hover:text-green-600">{t('profile.viewBookings')}</span>
              </button>
              <button 
                onClick={() => handleQuickAction('reviews')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-yellow-300 transition-all group"
              >
                <Star className="h-6 w-6 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700 group-hover:text-yellow-600">{t('profile.reviews')}</span>
              </button>
              <button 
                onClick={() => handleQuickAction('settings')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-400 transition-all group"
              >
                <Settings className="h-6 w-6 text-gray-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-700 group-hover:text-gray-600">{t('profile.settings')}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* My Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('profile.myResources')}</h3>
            <button
              onClick={() => setAddResourceModalOpen(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>{t('profile.addNew')}</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {userResources.map((resource) => (
              <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{resource.name}</h4>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleResourceAction(resource.id, 'edit')}
                      className="text-orange-600 hover:text-orange-800 text-sm"
                    >
                      {t('common.edit')}
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => handleResourceAction(resource.id, 'delete')}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      {t('common.delete')}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleResourceAction(resource.id, 'toggle-status')}
                    className={`text-sm px-2 py-1 rounded-full ${
                      resource.status === 'Active' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : resource.status === 'Booked'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors`}
                    disabled={resource.status === 'Booked'}
                  >
                    {t(`profile.${resource.status.toLowerCase()}`)}
                  </button>
                  <span className="text-orange-600 font-medium">{resource.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Resource Modal */}
        <AddResourceModal
          isOpen={addResourceModalOpen}
          onClose={() => setAddResourceModalOpen(false)}
          onAdd={handleAddResource}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Profile