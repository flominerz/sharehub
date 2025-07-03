import { useState } from 'react'
import { Search, Star, MapPin, Clock, Heart, Grid, List } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BookingModal from '../components/BookingModal'
import Footer from '../components/Footer'

interface Resource {
  id: number
  name: string
  category: string
  price: string
  priceType: string
  distance: string
  owner: string
  rating: number
  reviews: number
  available: boolean
  description: string
  location: string
  image?: string
}

const Marketplace = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(t('marketplace.allCategories'))
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [resourceToBook, setResourceToBook] = useState<Resource | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const navigate = useNavigate()

  // Sample marketplace data
  const allResources: Resource[] = [
    {
      id: 1,
      name: 'Professional Power Drill',
      category: t('marketplace.tools'),
      price: '5',
      priceType: 'day',
      distance: '0.5 miles',
      owner: 'John D.',
      rating: 4.8,
      reviews: 24,
      available: true,
      description: 'High-quality cordless drill perfect for home improvement projects.',
      location: 'Downtown',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Guitar Lessons - Beginner to Advanced',
      category: t('marketplace.skills'),
      price: '25',
      priceType: 'hour',
      distance: '0.3 miles',
      owner: 'Emma L.',
      rating: 5.0,
      reviews: 18,
      available: true,
      description: 'Learn guitar from a professional musician with 10+ years experience.',
      location: 'Music District',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Parking Space - City Center',
      category: t('marketplace.spaces'),
      price: '10',
      priceType: 'day',
      distance: '0.7 miles',
      owner: 'David K.',
      rating: 4.6,
      reviews: 12,
      available: true,
      description: 'Secure parking space in the heart of the city. Perfect for commuters.',
      location: 'City Center',
      image: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Professional Camera Equipment',
      category: t('marketplace.equipment'),
      price: '30',
      priceType: 'day',
      distance: '1.2 miles',
      owner: 'Sarah M.',
      rating: 4.9,
      reviews: 31,
      available: false,
      description: 'Canon EOS R5 with professional lenses for photography and videography.',
      location: 'Arts Quarter',
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      name: 'Bicycle Repair Service',
      category: t('marketplace.services'),
      price: '15',
      priceType: 'service',
      distance: '0.8 miles',
      owner: 'Mike R.',
      rating: 4.7,
      reviews: 22,
      available: true,
      description: 'Professional bicycle maintenance and repair service at your location.',
      location: 'Bike District',
      image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      name: 'Compact Car for City Trips',
      category: t('marketplace.vehicles'),
      price: '40',
      priceType: 'day',
      distance: '1.0 miles',
      owner: 'Lisa T.',
      rating: 4.5,
      reviews: 15,
      available: true,
      description: 'Fuel-efficient compact car perfect for city driving and short trips.',
      location: 'Residential Area',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 7,
      name: 'Meeting Room with Projector',
      category: t('marketplace.spaces'),
      price: '20',
      priceType: 'hour',
      distance: '0.4 miles',
      owner: 'Alex P.',
      rating: 4.8,
      reviews: 9,
      available: true,
      description: 'Professional meeting room equipped with projector and whiteboard.',
      location: 'Business District',
      image: 'https://images.pexels.com/photos/416320/pexels-photo-416320.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 8,
      name: 'Lawn Mower - Electric',
      category: t('marketplace.tools'),
      price: '8',
      priceType: 'day',
      distance: '0.6 miles',
      owner: 'Tom W.',
      rating: 4.4,
      reviews: 7,
      available: true,
      description: 'Eco-friendly electric lawn mower, perfect for small to medium yards.',
      location: 'Suburbs',
      image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const categories = [
    t('marketplace.allCategories'),
    t('marketplace.tools'),
    t('marketplace.skills'),
    t('marketplace.vehicles'),
    t('marketplace.spaces'),
    t('marketplace.services'),
    t('marketplace.equipment')
  ]

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === t('marketplace.allCategories') || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price)
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price)
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance)
      default:
        return b.id - a.id // newest first
    }
  })

  const handleResourceClick = (resourceId: number) => {
    navigate(`/resource/${resourceId}`)
  }

  const handleBookNow = (e: React.MouseEvent, resource: Resource) => {
    e.stopPropagation()
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

  const toggleFavorite = (e: React.MouseEvent, resourceId: number) => {
    e.stopPropagation()
    setFavorites(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('marketplace.title')}</h1>
          <p className="text-gray-600">{t('marketplace.subtitle')}</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t('marketplace.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="newest">{t('marketplace.newestFirst')}</option>
                <option value="price-low">{t('marketplace.priceLowToHigh')}</option>
                <option value="price-high">{t('marketplace.priceHighToLow')}</option>
                <option value="rating">{t('marketplace.highestRated')}</option>
                <option value="distance">{t('marketplace.nearestFirst')}</option>
              </select>
            </div>

            

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t('marketplace.showing')} {sortedResources.length} {t('common.of')} {allResources.length} {t('marketplace.resources')}
          </p>
        </div>

        {/* Resources Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedResources.map((resource) => (
              <div 
                key={resource.id} 
                onClick={() => handleResourceClick(resource.id)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 cursor-pointer"
              >
                {/* Resource Image */}
                <div className="relative">
                  <img
                    src={resource.image}
                    alt={resource.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button
                    onClick={(e) => toggleFavorite(e, resource.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full ${
                      favorites.includes(resource.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-gray-600 hover:text-red-500'
                    } transition-colors`}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(resource.id) ? 'fill-current' : ''}`} />
                  </button>
                  {!resource.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                      <span className="text-white font-medium">{t('marketplace.currentlyBooked')}</span>
                    </div>
                  )}
                </div>

                {/* Resource Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{resource.name}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {resource.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{resource.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{resource.distance}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span>{resource.rating} ({resource.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-orange-600">
                        ${resource.price}
                      </span>
                      <span className="text-gray-500 text-sm">/{t(`marketplace.per${resource.priceType.charAt(0).toUpperCase() + resource.priceType.slice(1)}`)}</span>
                    </div>
                    {resource.available ? (
                      <button
                        onClick={(e) => handleBookNow(e, resource)}
                        className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm hover:bg-orange-600 transition-colors"
                      >
                        {t('marketplace.bookNow')}
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">{t('marketplace.unavailable')}</span>
                    )}
                  </div>

                  <div className="mt-2 text-xs text-gray-500">
                    {t('common.by')} {resource.owner}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedResources.map((resource) => (
              <div 
                key={resource.id} 
                onClick={() => handleResourceClick(resource.id)}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6 cursor-pointer"
              >
                <div className="flex gap-6">
                  {/* Resource Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={resource.image}
                      alt={resource.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    {!resource.available && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">{t('marketplace.booked')}</span>
                      </div>
                    )}
                  </div>

                  {/* Resource Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{resource.name}</h3>
                        <span className="text-sm px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {resource.category}
                        </span>
                      </div>
                      <button
                        onClick={(e) => toggleFavorite(e, resource.id)}
                        className={`p-2 rounded-full ${
                          favorites.includes(resource.id) 
                            ? 'bg-red-500 text-white' 
                            : 'text-gray-600 hover:text-red-500'
                        } transition-colors`}
                      >
                        <Heart className={`h-5 w-5 ${favorites.includes(resource.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4">{resource.description}</p>

                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{resource.location} • {resource.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{resource.rating} ({resource.reviews} {t('marketplace.reviews')})</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{t('common.by')} {resource.owner}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-orange-600">
                          ${resource.price}
                        </span>
                        <span className="text-gray-500">/{t(`marketplace.per${resource.priceType.charAt(0).toUpperCase() + resource.priceType.slice(1)}`)}</span>
                      </div>
                      {resource.available ? (
                        <button
                          onClick={(e) => handleBookNow(e, resource)}
                          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                          {t('marketplace.bookNow')}
                        </button>
                      ) : (
                        <span className="text-gray-400">{t('marketplace.currentlyUnavailable')}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('marketplace.noResourcesFound')}</h3>
            <p className="text-gray-600">{t('marketplace.noResourcesFoundDesc')}</p>
          </div>
        )}

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

export default Marketplace