import { Shield, Eye, Lock, Users, FileText, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'

const Privacy = () => {
  const { t } = useTranslation()

  const sections = [
    {
      id: 'information-collection',
      title: t('privacy.informationCollection'),
      icon: FileText,
      content: [
        {
          subtitle: t('privacy.personalInformation'),
          text: t('privacy.personalInformationDesc')
        },
        {
          subtitle: t('privacy.resourceInformation'),
          text: t('privacy.resourceInformationDesc')
        },
        {
          subtitle: t('privacy.usageData'),
          text: t('privacy.usageDataDesc')
        },
        {
          subtitle: t('privacy.locationData'),
          text: t('privacy.locationDataDesc')
        }
      ]
    },
    {
      id: 'information-use',
      title: t('privacy.informationUse'),
      icon: Eye,
      content: [
        {
          subtitle: t('privacy.serviceProvision'),
          text: t('privacy.serviceProvisionDesc')
        },
        {
          subtitle: t('privacy.communication'),
          text: t('privacy.communicationDesc')
        },
        {
          subtitle: t('privacy.safetySecurity'),
          text: t('privacy.safetySecurityDesc')
        },
        {
          subtitle: t('privacy.improvement'),
          text: t('privacy.improvementDesc')
        }
      ]
    },
    {
      id: 'information-sharing',
      title: t('privacy.informationSharing'),
      icon: Users,
      content: [
        {
          subtitle: t('privacy.withOtherUsers'),
          text: t('privacy.withOtherUsersDesc')
        },
        {
          subtitle: t('privacy.serviceProviders'),
          text: t('privacy.serviceProvidersDesc')
        },
        {
          subtitle: t('privacy.legalRequirements'),
          text: t('privacy.legalRequirementsDesc')
        },
        {
          subtitle: t('privacy.businessTransfers'),
          text: t('privacy.businessTransfersDesc')
        }
      ]
    },
    {
      id: 'data-security',
      title: t('privacy.dataSecurity'),
      icon: Lock,
      content: [
        {
          subtitle: t('privacy.encryption'),
          text: t('privacy.encryptionDesc')
        },
        {
          subtitle: t('privacy.accessControls'),
          text: t('privacy.accessControlsDesc')
        },
        {
          subtitle: t('privacy.regularAudits'),
          text: t('privacy.regularAuditsDesc')
        },
        {
          subtitle: t('privacy.incidentResponse'),
          text: t('privacy.incidentResponseDesc')
        }
      ]
    }
  ]

  const rights = [
    t('privacy.accessData'),
    t('privacy.correctData'),
    t('privacy.deleteData'),
    t('privacy.restrictProcessing'),
    t('privacy.dataPortability'),
    t('privacy.withdrawConsent')
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('privacy.title')}</h1>
          <p className="text-xl text-orange-100">
            {t('privacy.subtitle')}
          </p>
          <p className="text-sm text-orange-200 mt-4">{t('privacy.lastUpdated', { date: 'January 15, 2025' })}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-orange-900 mb-2">{t('privacy.importantNotice')}</h3>
                <p className="text-orange-800">
                  {t('privacy.noticeText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                    <section.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.subtitle}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('privacy.yourRights')}</h2>
            <p className="text-gray-600 mb-6">
              {t('privacy.yourRights')}
            </p>
            <ul className="space-y-3">
              {rights.map((right, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600">{right}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                {t('privacy.contactPrivacyTeam')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cookies Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('privacy.cookiesTracking')}</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                {t('privacy.cookiesTrackingDesc')}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('privacy.essentialCookies')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('privacy.essentialCookiesDesc')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('privacy.analyticsCookies')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('privacy.analyticsCookiesDesc')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('privacy.preferenceCookies')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('privacy.preferenceCookiesDesc')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('privacy.marketingCookies')}</h3>
                  <p className="text-sm text-gray-600">
                    {t('privacy.marketingCookiesDesc')}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                {t('privacy.manageCookies')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.questionsAboutPrivacy')}</h2>
            <p className="text-gray-600 mb-6">
              {t('privacy.questionsAboutPrivacyDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
              >
                {t('navigation.contact')}
              </a>
              <a
                href="mailto:privacy@sharehub.com"
                className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-md hover:bg-orange-50 transition-colors font-medium"
              >
                {t('privacy.emailPrivacyTeam')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Privacy