import { Search, Truck, Wrench, Lightbulb, Building, BookOpen, Clock, Shield, Users, Timer, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'

const Home = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleCategoryClick = (category: string) => {
    navigate(`/marketplace?category=${encodeURIComponent(category)}`)
  }

  const howItWorksSteps = [
    {
      icon: Search,
      title: t('home.searchDiscover'),
      description: t('home.searchDiscoverDesc')
    },
    {
      icon: Calendar,
      title: t('home.bookReserve'),
      description: t('home.bookReserveDesc')
    },
    {
      icon: Users,
      title: t('home.payEarn'),
      description: t('home.payEarnDesc')
    },
    {
      icon: Building,
      title: t('home.buildCommunity'),
      description: t('home.buildCommunityDesc')
    }
  ]

  const categories = [
    {
      icon: Truck,
      title: t('home.transportation'),
      description: t('home.transportationDesc'),
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Wrench,
      title: t('home.toolsEquipment'),
      description: t('home.toolsEquipmentDesc'),
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: Lightbulb,
      title: t('home.skillsServices'),
      description: t('home.skillsServicesDesc'),
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      icon: Building,
      title: t('home.venuesSpaces'),
      description: t('home.venuesSpacesDesc'),
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: BookOpen,
      title: t('home.information'),
      description: t('home.informationDesc'),
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: Clock,
      title: t('home.timeLabor'),
      description: t('home.timeLaborDesc'),
      color: 'bg-pink-50 text-pink-600'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: t('home.reduceCosts'),
      description: t('home.reduceCostsDesc')
    },
    {
      icon: Users,
      title: t('home.buildCommunityBenefit'),
      description: t('home.buildCommunityBenefitDesc')
    },
    {
      icon: Timer,
      title: t('home.reduceWaste'),
      description: t('home.reduceWasteDesc')
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              {t('home.heroSubtitle')}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button 
                onClick={() => navigate('/marketplace')}
                className="flex items-center justify-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-md font-medium hover:bg-orange-50 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span>{t('home.exploreResources')}</span>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="flex items-center justify-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-orange-600 transition-colors"
              >
                <span>{t('home.shareYourResources')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How ShareHub Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
              {t('home.howItWorks')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.howItWorksSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {howItWorksSteps.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
              {t('home.resourceCategories')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.resourceCategoriesSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(({ icon: Icon, title, description, color }, index) => (
              <div 
                key={index} 
                onClick={() => handleCategoryClick(title)}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group border border-gray-200"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ShareHub */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.whyChooseShareHub')}
            </h2>
            <p className="text-xl text-orange-100">
              {t('home.whyChooseShareHubSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-orange-100">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Start */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
            {t('home.readyToStart')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('home.readyToStartSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/profile')}
              className="bg-orange-500 text-white px-8 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
            >
              {t('home.getStartedToday')}
            </button>
            <button 
              onClick={() => navigate('/marketplace')}
              className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-md font-medium hover:bg-orange-50 transition-colors"
            >
              {t('home.browseMarketplace')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home