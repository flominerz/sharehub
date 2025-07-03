import { useState } from 'react'
import { X, Upload, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface AddResourceModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (resourceData: any) => void
}

const AddResourceModal: React.FC<AddResourceModalProps> = ({ isOpen, onClose, onAdd }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    category: t('addResource.tools'),
    description: '',
    price: '',
    priceType: t('addResource.day'),
    location: '',
    availability: 'available'
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      ...formData,
      id: Date.now(),
      owner: 'You',
      rating: 0,
      reviews: 0
    })
    setFormData({
      name: '',
      category: t('addResource.tools'),
      description: '',
      price: '',
      priceType: t('addResource.day'),
      location: '',
      availability: 'available'
    })
    onClose()
  }

  const categories = [
    t('marketplace.tools'),
    t('marketplace.skills'),
    t('marketplace.vehicles'),
    t('marketplace.spaces'),
    t('marketplace.services'),
    t('marketplace.equipment')
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t('addResource.title')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('addResource.resourceName')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder={t('addResource.resourceNamePlaceholder')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('addResource.category')}</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('addResource.description')}</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              rows={3}
              placeholder={t('addResource.descriptionPlaceholder')}
            />
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('addResource.price')}</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('addResource.per')}</label>
              <select
                value={formData.priceType}
                onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              >
                <option value={t('addResource.hour')}>{t('addResource.hour')}</option>
                <option value={t('addResource.day')}>{t('addResource.day')}</option>
                <option value={t('addResource.week')}>{t('addResource.week')}</option>
                <option value={t('addResource.service')}>{t('addResource.service')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="inline h-4 w-4 mr-1" />
              {t('addResource.location')}
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder={t('addResource.locationPlaceholder')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Upload className="inline h-4 w-4 mr-1" />
              {t('addResource.photos')}
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              {t('addResource.addResource')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddResourceModal