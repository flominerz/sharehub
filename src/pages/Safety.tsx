import { Shield, Eye, Users, AlertTriangle, CheckCircle, Lock, Phone, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'

const Safety = () => {
  const { t } = useTranslation()

  const safetyFeatures = [
    {
      icon: Shield,
      title: t('safety.identityVerification'),
      description: t('safety.identityVerificationDesc')
    },
    {
      icon: Eye,
      title: t('safety.profileReviews'),
      description: t('safety.profileReviewsDesc')
    },
    {
      icon: Lock,
      title: t('safety.securePayments'),
      description: t('safety.securePaymentsDesc')
    },
    {
      icon: Phone,
      title: t('safety.24x7Support'),
      description: t('safety.24x7SupportDesc')
    }
  ]

  const safetyTips = {
    owners: [
      t('safety.ownerTips.verifyIdentity'),
      t('safety.ownerTips.takePhotos'),
      t('safety.ownerTips.setExpectations'),
      t('safety.ownerTips.meetPublic'),
      t('safety.ownerTips.trustInstincts'),
      t('safety.ownerTips.keepRecords')
    ],
    renters: [
      t('safety.renterTips.readCarefully'),
      t('safety.renterTips.communicateClearly'),
      t('safety.renterTips.inspectThoroughly'),
      t('safety.renterTips.followGuidelines'),
      t('safety.renterTips.returnSameCondition'),
      t('safety.renterTips.reportIssues')
    ]
  }

  const reportingSteps = [
    {
      step: 1,
      title: t('safety.step1'),
      description: t('safety.step1Desc')
    },
    {
      step: 2,
      title: t('safety.step2'),
      description: t('safety.step2Desc')
    },
    {
      step: 3,
      title: t('safety.step3'),
      description: t('safety.step3Desc')
    },
    {
      step: 4,
      title: t('safety.step4'),
      description: t('safety.step4Desc')
    }
  ]

  const prohibitedBehaviors = [
    t('safety.prohibitedList.harassment'),
    t('safety.prohibitedList.discrimination'),
    t('safety.prohibitedList.falseInfo'),
    t('safety.prohibitedList.outsideTransactions'),
    t('safety.prohibitedList.damaging'),
    t('safety.prohibitedList.fakeAccounts'),
    t('safety.prohibitedList.inappropriateContent'),
    t('safety.prohibitedList.violatingLaws')
  ]

  const emergencyContacts = [
    {
      situation: t('safety.immediateDanger'),
      contact: t('safety.immediateDangerContact'),
      description: t('safety.immediateDangerDesc')
    },
    {
      situation: t('safety.safetyEmergency'),
      contact: t('safety.safetyEmergencyContact'),
      description: t('safety.safetyEmergencyDesc')
    },
    {
      situation: t('safety.generalSafetyIssues'),
      contact: t('safety.generalSafetyContact'),
      description: t('safety.generalSafetyDesc')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('safety.title')}</h1>
          <p className="text-xl text-orange-100">
            {t('safety.subtitle')}
          </p>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('safety.builtInSafetyFeatures')}</h2>
            <p className="text-xl text-gray-600">
              {t('safety.safetyFeaturesDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('safety.safetyBestPractices')}</h2>
            <p className="text-xl text-gray-600">
              {t('safety.safetyBestPracticesDesc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* For Resource Owners */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t('safety.forResourceOwners')}</h3>
              </div>
              <ul className="space-y-3">
                {safetyTips.owners.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Renters */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t('safety.forRenters')}</h3>
              </div>
              <ul className="space-y-3">
                {safetyTips.renters.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('safety.howToReportSafetyConcerns')}</h2>
            <p className="text-xl text-gray-600">
              {t('safety.reportingStepsDesc')}
            </p>
          </div>

          <div className="space-y-8">
            {reportingSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Behaviors */}
      <section className="py-16 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('safety.prohibitedBehaviors')}</h2>
            <p className="text-xl text-gray-600">
              {t('safety.prohibitedBehaviorsDesc')}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {prohibitedBehaviors.map((behavior, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{behavior}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('safety.emergencyContacts')}</h2>
            <p className="text-xl text-gray-600">
              {t('safety.emergencyContactsDesc')}
            </p>
          </div>

          <div className="space-y-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg flex-shrink-0">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.situation}</h3>
                    <p className="text-red-600 font-medium mb-2">{contact.contact}</p>
                    <p className="text-gray-600 text-sm">{contact.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-8 w-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">{t('safety.insuranceLiability')}</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('safety.platformProtection')}</h3>
                <p className="text-gray-600">
                  {t('safety.platformProtectionDesc')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('safety.userResponsibility')}</h3>
                <p className="text-gray-600">
                  {t('safety.userResponsibilityDesc')}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('safety.damageResolution')}</h3>
                <p className="text-gray-600">
                  {t('safety.damageResolutionDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Safety Team */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('safety.questionsAboutSafety')}</h2>
          <p className="text-gray-600 mb-6">
            {t('safety.questionsAboutSafetyDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
            >
              {t('safety.contactSafetyTeam')}
            </a>
            <a
              href="mailto:safety@sharehub.com"
              className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-md hover:bg-orange-50 transition-colors font-medium"
            >
              {t('safety.emailSafetyTeam')}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Safety