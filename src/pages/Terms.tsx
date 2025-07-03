import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'

const Terms = () => {
  const { t } = useTranslation()

  const sections = [
    {
      id: 'acceptance',
      title: t('terms.acceptanceOfTerms'),
      icon: CheckCircle,
      content: t('terms.acceptanceDesc')
    },
    {
      id: 'description',
      title: t('terms.serviceDescription'),
      icon: FileText,
      content: t('terms.serviceDescriptionText')
    },
    {
      id: 'user-accounts',
      title: t('terms.userAccounts'),
      icon: Shield,
      content: t('terms.userAccountsDesc')
    },
    {
      id: 'user-conduct',
      title: t('terms.userConduct'),
      icon: Scale,
      content: t('terms.userConductDesc')
    }
  ]

  const responsibilities = {
    owners: [
      t('terms.provideAccurateDescriptions'),
      t('terms.ensureResourcesSafe'),
      t('terms.respondPromptly'),
      t('terms.honorBookings'),
      t('terms.maintainInsurance'),
      t('terms.complyWithLaws')
    ],
    renters: [
      t('terms.useResourcesResponsibly'),
      t('terms.returnInSameCondition'),
      t('terms.payFeesPromptly'),
      t('terms.communicateIssues'),
      t('terms.followSafetyGuidelines'),
      t('terms.respectProperty')
    ]
  }

  const prohibitedItems = [
    t('terms.weapons'),
    t('terms.illegalDrugs'),
    t('terms.stolenGoods'),
    t('terms.intellectualProperty'),
    t('terms.hazardousMaterials'),
    t('terms.adultContent'),
    t('terms.liveAnimals'),
    t('terms.unlicensedItems')
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('terms.title')}</h1>
          <p className="text-xl text-orange-100">
            {t('terms.subtitle')}
          </p>
          <p className="text-sm text-orange-200 mt-4">{t('terms.lastUpdated', { date: 'January 15, 2025' })}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">{t('terms.importantLegalAgreement')}</h3>
                <p className="text-orange-800">
                  {t('terms.legalAgreementDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Terms Sections */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                    <section.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Responsibilities */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('terms.userResponsibilities')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resource Owners */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                {t('terms.resourceOwners')}
              </h3>
              <ul className="space-y-3">
                {responsibilities.owners.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Renters */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                {t('terms.rentersUsers')}
              </h3>
              <ul className="space-y-3">
                {responsibilities.renters.map((responsibility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Prohibited Items */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <XCircle className="h-8 w-8 text-red-600 mr-3" />
              {t('terms.prohibitedItems')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('terms.prohibitedItemsDesc')}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {prohibitedItems.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment and Fees */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('terms.paymentFees')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('terms.serviceFees')}</h3>
                <p className="text-gray-600">
                  {t('terms.serviceFeesDesc')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('terms.paymentProcessing')}</h3>
                <p className="text-gray-600">
                  {t('terms.paymentProcessingDesc')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('terms.refundsCancellations')}</h3>
                <p className="text-gray-600">
                  {t('terms.refundsCancellationsDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liability and Insurance */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('terms.liabilityInsurance')}</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">{t('terms.importantDisclaimer')}</h3>
                    <p className="text-yellow-800 text-sm">
                      {t('terms.disclaimerText')}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('terms.platformLiability')}</h3>
                <p className="text-gray-600">
                  {t('terms.platformLiabilityDesc')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('terms.userInsurance')}</h3>
                <p className="text-gray-600">
                  {t('terms.userInsuranceDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Termination */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('terms.accountTermination')}</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                {t('terms.terminationDesc')}
              </p>
              <p className="text-gray-600">
                {t('terms.userTermination')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.questionsAboutTerms')}</h2>
          <p className="text-gray-600 mb-6">
            {t('terms.questionsAboutTermsDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
            >
              {t('terms.contactSupport')}
            </a>
            <a
              href="mailto:legal@sharehub.com"
              className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-md hover:bg-orange-50 transition-colors font-medium"
            >
              {t('terms.emailLegalTeam')}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Terms