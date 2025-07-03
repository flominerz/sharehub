import { useState } from 'react'
import { X, Calendar, Clock, CreditCard } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface BookingModalProps {
  resource: {
    id: number
    name: string
    price: string
    owner: string
    rating: number
  }
  isOpen: boolean
  onClose: () => void
  onConfirm: (bookingData: any) => void
}

const BookingModal: React.FC<BookingModalProps> = ({ resource, isOpen, onClose, onConfirm }) => {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState('1')
  const [paymentMethod, setPaymentMethod] = useState('tokens')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const bookingData = {
      resourceId: resource.id,
      resourceName: resource.name,
      date: selectedDate,
      time: selectedTime,
      duration: parseInt(duration),
      paymentMethod,
      totalCost: resource.price
    }
    onConfirm(bookingData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {t('booking.bookResource', { resourceName: resource.name })}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Calendar className="inline h-4 w-4 mr-1" />
              {t('booking.date')}
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="inline h-4 w-4 mr-1" />
              {t('booking.time')}
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">{t('booking.selectTime')}</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('booking.duration')}</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
            >
              <option value="1">{t('booking.1day')}</option>
              <option value="2">{t('booking.2days')}</option>
              <option value="3">{t('booking.3days')}</option>
              <option value="7">{t('booking.1week')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <CreditCard className="inline h-4 w-4 mr-1" />
              {t('booking.paymentMethod')}
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
            >
              <option value="tokens">{t('booking.shareHubTokens')}</option>
              <option value="card">{t('booking.creditCard')}</option>
              <option value="paypal">{t('booking.paypal')}</option>
            </select>
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between text-sm">
              <span>{t('booking.resource')}:</span>
              <span>{resource.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t('booking.owner')}:</span>
              <span>{resource.owner}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t('booking.duration')}:</span>
              <span>{duration} {duration === '1' ? t('booking.1day').split(' ')[1] : t('booking.2days').split(' ')[1]}</span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t pt-2 mt-2">
              <span>{t('booking.total')}:</span>
              <span className="text-orange-600">{resource.price}</span>
            </div>
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
              {t('booking.confirmBooking')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingModal