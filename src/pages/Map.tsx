import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { useTranslation } from 'react-i18next'
import BookingModal from '../components/BookingModal'
import Footer from '../components/Footer'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in React Leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Sample resource data with coordinates
const sampleResources = [
  {
    id: 1,
    name: 'Power Drill',
    category: 'Tools',
    price: '$5/day',
    distance: '0.5 miles',
    lat: 40.7128,
    lng: -74.0060,
    owner: 'John D.',
    rating: 4.8,
    available: true
  },
  {
    id: 2,
    name: 'Ladder',
    category: 'Tools',
    price: '$8/day',
    distance: '0.8 miles',
    lat: 40.7589,
    lng: -73.9851,
    owner: 'Sarah M.',
    rating: 4.9,
    available: true
  },
  {
    id: 3,
    name: 'Car Wash Service',
    category: 'Services',
    price: '$15/service',
    distance: '1.2 miles',
    lat: 40.7505,
    lng: -73.9934,
    owner: 'Mike R.',
    rating: 4.7,
    available: false
  },
  {
    id: 4,
    name: 'Guitar Lessons',
    category: 'Skills',
    price: '$25/hour',
    distance: '0.3 miles',
    lat: 40.7282,
    lng: -74.0776,
    owner: 'Emma L.',
    rating: 5.0,
    available: true
  },
  {
    id: 5,
    name: 'Parking Space',
    category: 'Spaces',
    price: '$10/day',
    distance: '0.7 miles',
    lat: 40.7614,
    lng: -73.9776,
    owner: 'David K.',
    rating: 4.6,
    available: true
  }
]

const Map = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState(t('map.allCategories'))
  const [selectedResource, setSelectedResource] = useState<typeof sampleResources[0] | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [resourceToBook, setResourceToBook] = useState<typeof sampleResources[0] | null>(null)

  const filteredResources = selectedCategory === t('map.allCategories')
    ? sampleResources 
    : sampleResources.filter(resource => resource.category === selectedCategory)

  const categories = [
    t('map.allCategories'),
    t('map.tools'),
    t('map.skills'),
    t('map.vehicles'),
    t('map.spaces'),
    t('map.services')
  ]

  const handleBookNow = (resource: typeof sampleResources[0]) => {
    setResourceToBook(resource)
    setBookingModalOpen(true)
  }

  const handleBookingConfirm = (bookingData: any) => {
    console.log('Booking confirmed:', bookingData)
    alert(t('booking.bookingConfirmed', { 
      resourceName: bookingData.resourceName, 
      date: bookingData.date, 
      time: bookingData.time 
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen bg-gray-100">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-1/3 bg-white shadow-lg overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('map.title')}</h2>
              
              {/* Filters */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('map.categoryFilter')}</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Resource List */}
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <div 
                    key={resource.id} 
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                      selectedResource?.id === resource.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    } ${!resource.available ? 'opacity-60' : ''}`}
                    onClick={() => setSelectedResource(resource)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        resource.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {resource.available ? t('map.available') : t('map.booked')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{resource.category}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{resource.distance} {t('map.away')}</span>
                      <span className="text-orange-600 font-medium">{resource.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="text-gray-600">{t('common.by')} {resource.owner}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                    {resource.available && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBookNow(resource)
                        }}
                        className="w-full mt-3 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors text-sm"
                      >
                        {t('map.bookNow')}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Map Area */}
          <div className="flex-1 relative">
            <MapContainer
              center={[40.7128, -74.0060]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredResources.map((resource) => (
                <Marker
                  key={resource.id}
                  position={[resource.lat, resource.lng]}
                  icon={defaultIcon}
                  eventHandlers={{
                    click: () => setSelectedResource(resource)
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-gray-900 mb-1">{resource.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{resource.category}</p>
                      <p className="text-sm text-orange-600 font-medium mb-1">{resource.price}</p>
                      <p className="text-xs text-gray-500">{t('common.by')} {resource.owner}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="ml-1 text-xs text-gray-600">{resource.rating}</span>
                        <span className={`ml-2 text-xs px-1 py-0.5 rounded ${
                          resource.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {resource.available ? t('map.available') : t('map.booked')}
                        </span>
                      </div>
                      {resource.available && (
                        <button
                          onClick={() => handleBookNow(resource)}
                          className="w-full mt-2 bg-orange-500 text-white py-1 px-2 rounded text-xs hover:bg-orange-600 transition-colors"
                        >
                          {t('map.bookNow')}
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            
            {/* Resource Details Panel */}
            {selectedResource && (
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-80 z-10">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedResource.name}</h3>
                  <button 
                    onClick={() => setSelectedResource(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">{t('map.category')}:</span> {selectedResource.category}</p>
                  <p><span className="font-medium">{t('map.price')}:</span> {selectedResource.price}</p>
                  <p><span className="font-medium">{t('map.distance')}:</span> {selectedResource.distance}</p>
                  <p><span className="font-medium">{t('map.owner')}:</span> {selectedResource.owner}</p>
                  <div className="flex items-center">
                    <span className="font-medium">{t('map.rating')}:</span>
                    <span className="ml-2 text-yellow-500">★</span>
                    <span className="ml-1">{selectedResource.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{t('map.status')}:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedResource.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedResource.available ? t('map.available') : t('map.currentlyBooked')}
                    </span>
                  </div>
                </div>
                {selectedResource.available && (
                  <button 
                    onClick={() => handleBookNow(selectedResource)}
                    className="w-full mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                  >
                    {t('map.bookNow')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Booking Modal */}
        {resourceToBook && (
          <BookingModal
            resource={resourceToBook}
            isOpen={bookingModalOpen}
            onClose={() => {
              setBookingModalOpen(false)
              setResourceToBook(null)
            }}
            onConfirm={handleBookingConfirm}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Map