import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, MapPin, Clock, Heart, Shield, MessageCircle, Share2 } from 'lucide-react'
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
  images?: string[]
  fullDescription?: string
  features?: string[]
  ownerRating?: number
  ownerReviews?: number
  responseTime?: string
  joinedDate?: string
}

interface Review {
  id: number
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

const ResourceDetails = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [resource, setResource] = useState<Resource | null>(null)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showAllReviews, setShowAllReviews] = useState(false)

  // Sample detailed resource data
  const sampleResources: Resource[] = [
    {
      id: 1,
      name: 'Professional Power Drill',
      category: 'Tools',
      price: '5',
      priceType: 'day',
      distance: '0.5 miles',
      owner: 'John D.',
      rating: 4.8,
      reviews: 24,
      available: true,
      description: 'High-quality cordless drill perfect for home improvement projects.',
      location: 'Downtown',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1249612/pexels-photo-1249612.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      fullDescription: 'This professional-grade cordless power drill is perfect for all your DIY and home improvement needs. Features a powerful 18V battery, multiple speed settings, and comes with a complete set of drill bits and screwdriver attachments. The drill has been well-maintained and is in excellent working condition.',
      features: [
        '18V Lithium-ion battery',
        'Variable speed trigger',
        'LED work light',
        'Complete drill bit set included',
        'Carrying case provided',
        'Recently serviced and calibrated'
      ],
      ownerRating: 4.9,
      ownerReviews: 47,
      responseTime: 'Usually responds within 2 hours',
      joinedDate: 'Member since January 2023'
    },
    {
      id: 2,
      name: 'Guitar Lessons - Beginner to Advanced',
      category: 'Skills',
      price: '25',
      priceType: 'hour',
      distance: '0.3 miles',
      owner: 'Emma L.',
      rating: 5.0,
      reviews: 18,
      available: true,
      description: 'Learn guitar from a professional musician with 10+ years experience.',
      location: 'Music District',
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1010519/pexels-photo-1010519.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      fullDescription: 'Professional guitar instruction for all skill levels. I\'m a classically trained guitarist with over 10 years of teaching experience. Whether you\'re a complete beginner or looking to refine advanced techniques, I can help you achieve your musical goals. Lessons are tailored to your preferred style - classical, rock, folk, or jazz.',
      features: [
        'Personalized lesson plans',
        'All skill levels welcome',
        'Multiple music styles covered',
        'Sheet music and tabs provided',
        'Performance opportunities',
        'Flexible scheduling available'
      ],
      ownerRating: 5.0,
      ownerReviews: 32,
      responseTime: 'Usually responds within 1 hour',
      joinedDate: 'Member since March 2022'
    },
    {
      id: 3,
      name: 'Parking Space - City Center',
      category: 'Spaces',
      price: '10',
      priceType: 'day',
      distance: '0.7 miles',
      owner: 'David K.',
      rating: 4.6,
      reviews: 12,
      available: true,
      description: 'Secure parking space in the heart of the city. Perfect for commuters.',
      location: 'City Center',
      image: 'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=800',
      images: [
        'https://images.pexels.com/photos/753876/pexels-photo-753876.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      fullDescription: 'Premium parking space located in the heart of the city center, just 2 blocks from the main business district. This covered parking spot offers security and convenience for daily commuters or visitors. The space is suitable for standard-sized vehicles and includes 24/7 access.',
      features: [
        'Covered parking space',
        '24/7 access available',
        'Security cameras in area',
        'Close to public transport',
        'Suitable for standard vehicles',
        'Easy in/out access'
      ],
      ownerRating: 4.7,
      ownerReviews: 23,
      responseTime: 'Usually responds within 3 hours',
      joinedDate: 'Member since August 2023'
    }
  ]

  const sampleReviews: Review[] = [
    {
      id: 1,
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Excellent quality drill, worked perfectly for my kitchen renovation project. John was very responsive and helpful!',
      date: '2 weeks ago',
      verified: true
    },
    {
      id: 2,
      userName: 'Mike R.',
      rating: 4,
      comment: 'Good condition tool, exactly as described. Easy pickup and return process.',
      date: '1 month ago',
      verified: true
    },
    {
      id: 3,
      userName: 'Lisa T.',
      rating: 5,
      comment: 'Great experience! The drill had plenty of battery life and all the attachments I needed.',
      date: '2 months ago',
      verified: false
    }
  ]

  useEffect(() => {
    const resourceId = parseInt(id || '0')
    const foundResource = sampleResources.find(r => r.id === resourceId)
    setResource(foundResource || null)
  }, [id])

  if (!resource) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('resourceDetails.resourceNotFound')}</h2>
            <button
              onClick={() => navigate('/marketplace')}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              {t('resourceDetails.backToMarketplace')}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleBookNow = () => {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resource.name,
        text: resource.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const displayedReviews = showAllReviews ? sampleReviews : sampleReviews.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/marketplace')}
          className="flex items-center text-gray-600 hover:text-orange-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('resourceDetails.backToMarketplace')}
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={resource.images?.[selectedImageIndex] || resource.image}
                alt={resource.name}
                className="w-full h-full object-cover"
              />
            </div>
            {resource.images && resource.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {resource.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${resource.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Resource Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{resource.name}</h1>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors ${
                      isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  {resource.category}
                </span>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{resource.location} • {resource.distance}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{resource.rating} ({resource.reviews} {t('marketplace.reviews')})</span>
                </div>
              </div>
            </div>

            {/* Price and Availability */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-orange-600">
                    ${resource.price}
                  </span>
                  <span className="text-gray-600 ml-1">/{t(`marketplace.per${resource.priceType.charAt(0).toUpperCase() + resource.priceType.slice(1)}`)}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  resource.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {resource.available ? t('resourceDetails.available') : t('resourceDetails.currentlyBooked')}
                </span>
              </div>
              {resource.available ? (
                <button
                  onClick={handleBookNow}
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors font-medium"
                >
                  {t('resourceDetails.bookNow')}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-md cursor-not-allowed font-medium"
                >
                  {t('resourceDetails.currentlyUnavailable')}
                </button>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('resourceDetails.description')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {resource.fullDescription || resource.description}
              </p>
            </div>

            {/* Features */}
            {resource.features && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('resourceDetails.featuresIncludes')}</h3>
                <ul className="space-y-2">
                  {resource.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Owner Information */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('resourceDetails.aboutOwner')}</h3>
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-semibold text-lg">
                {resource.owner.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{resource.owner}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>{resource.ownerRating} ({resource.ownerReviews} {t('marketplace.reviews')})</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{resource.responseTime}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{resource.joinedDate}</p>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">{t('resourceDetails.verifiedOwner')}</span>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>{t('resourceDetails.contact')}</span>
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('marketplace.reviews')} ({resource.reviews})
            </h3>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-semibold">{resource.rating}</span>
              <span className="text-gray-600">{t('resourceDetails.outOf5')}</span>
            </div>
          </div>

          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-medium text-sm">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-gray-900">{review.userName}</h5>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          {t('resourceDetails.verified')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sampleReviews.length > 3 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                {showAllReviews ? t('resourceDetails.showLessReviews') : t('resourceDetails.showAllReviews', { count: sampleReviews.length })}
              </button>
            </div>
          )}
        </div>

        {/* Booking Modal */}
        <BookingModal
          resource={resource}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          onConfirm={handleBookingConfirm}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default ResourceDetails