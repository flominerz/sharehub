import { Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Share2 className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">ShareHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('footer.tagline')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.platform')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/marketplace" className="hover:text-white transition-colors">{t('navigation.marketplace')}</a></li>
              <li><a href="/map" className="hover:text-white transition-colors">{t('navigation.map')}</a></li>
              <li><a href="/calendar" className="hover:text-white transition-colors">{t('navigation.calendar')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/help" className="hover:text-white transition-colors">{t('footer.helpCenter')}</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">{t('navigation.contact')}</a></li>
              <li><a href="/safety" className="hover:text-white transition-colors">{t('navigation.safety')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/about" className="hover:text-white transition-colors">{t('navigation.about')}</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">{t('navigation.privacy')}</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">{t('navigation.terms')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          © 2025 ShareHub. {t('footer.allRightsReserved')}.
        </div>
      </div>
    </footer>
  )
}

export default Footer