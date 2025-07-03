import { useState } from 'react'
import { Search, HelpCircle, Book, MessageCircle, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'

const Help = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const categories = [
    {
      title: t('help.gettingStarted'),
      icon: Book,
      articles: [
        t('help.gettingStartedArticles.createAccount'),
        t('help.gettingStartedArticles.setupProfile'),
        t('help.gettingStartedArticles.verifyIdentity'),
        t('help.gettingStartedArticles.understandBasics')
      ]
    },
    {
      title: t('help.sharingResources'),
      icon: HelpCircle,
      articles: [
        t('help.sharingResourcesArticles.listFirstResource'),
        t('help.sharingResourcesArticles.setPricing'),
        t('help.sharingResourcesArticles.manageBookings'),
        t('help.sharingResourcesArticles.bestPracticesPhotos')
      ]
    },
    {
      title: t('help.bookingResources'),
      icon: MessageCircle,
      articles: [
        t('help.bookingResourcesArticles.searchFind'),
        t('help.bookingResourcesArticles.makeFirstBooking'),
        t('help.bookingResourcesArticles.understandPayments'),
        t('help.bookingResourcesArticles.communicateOwners')
      ]
    },
    {
      title: t('help.safetyTrust'),
      icon: Phone,
      articles: [
        t('help.safetyTrustArticles.safetyGuidelines'),
        t('help.safetyTrustArticles.identityVerification'),
        t('help.safetyTrustArticles.reportingIssues'),
        t('help.safetyTrustArticles.insuranceLiability')
      ]
    }
  ]

  const faqs = [
    {
      question: t('help.faq1.question'),
      answer: t('help.faq1.answer')
    },
    {
      question: t('help.faq2.question'),
      answer: t('help.faq2.answer')
    },
    {
      question: t('help.faq3.question'),
      answer: t('help.faq3.answer')
    },
    {
      question: t('help.faq4.question'),
      answer: t('help.faq4.answer')
    },
    {
      question: t('help.faq5.question'),
      answer: t('help.faq5.answer')
    },
    {
      question: t('help.faq6.question'),
      answer: t('help.faq6.answer')
    },
    {
      question: t('help.faq7.question'),
      answer: t('help.faq7.answer')
    },
    {
      question: t('help.faq8.question'),
      answer: t('help.faq8.answer')
    }
  ]

  const contactOptions = [
    {
      title: t('help.liveChat'),
      description: t('help.liveChatDesc'),
      icon: MessageCircle,
      action: t('help.startChat'),
      available: t('help.liveChatAvailable')
    },
    {
      title: t('help.emailSupport'),
      description: t('help.emailSupportDesc'),
      icon: Mail,
      action: t('help.sendEmail'),
      available: t('help.emailSupportResponse')
    },
    {
      title: t('help.phoneSupport'),
      description: t('help.phoneSupportDesc'),
      icon: Phone,
      action: t('help.callNow'),
      available: t('help.phoneSupportAvailable')
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('help.title')}</h1>
          <p className="text-xl text-orange-100 mb-8">
            {t('help.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t('help.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('help.browseHelpTopics')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                  <category.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-orange-600 transition-colors flex items-center"
                      >
                        <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" />
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('help.frequentlyAskedQuestions')}</h2>
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                    expandedFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('help.noResultsFound')}</h3>
              <p className="text-gray-600">
                {t('help.noResultsFoundDesc')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('help.stillNeedHelp')}</h2>
            <p className="text-xl text-gray-600">
              {t('help.stillNeedHelpDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <option.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <p className="text-sm text-gray-500 mb-4">{option.available}</p>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t('help.popularHelpArticles')}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              t('help.popularArticles.createFirstListing'),
              t('help.popularArticles.understandSafety'),
              t('help.popularArticles.paymentBilling'),
              t('help.popularArticles.successfulSharing'),
              t('help.popularArticles.buildTrust'),
              t('help.popularArticles.troubleshootBooking')
            ].map((article, index) => (
              <a
                key={index}
                href="#"
                className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                    {article}
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Help