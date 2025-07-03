import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'

interface Booking {
  id: number
  resourceName: string
  date: Date
  time: string
  duration: string
  status: 'confirmed' | 'pending' | 'cancelled'
  type: 'rental' | 'service'
}

const Calendar = () => {
  const { t } = useTranslation()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      resourceName: 'Power Drill',
      date: new Date(2025, 5, 30), // June 30, 2025
      time: '14:00',
      duration: '4 hours',
      status: 'confirmed',
      type: 'rental'
    },
    {
      id: 2,
      resourceName: 'Guitar Lessons',
      date: new Date(2025, 6, 1), // July 1, 2025
      time: '10:00',
      duration: '1 hour',
      status: 'confirmed',
      type: 'service'
    },
    {
      id: 3,
      resourceName: 'Parking Space',
      date: new Date(2025, 6, 3), // July 3, 2025
      time: '08:00',
      duration: '8 hours',
      status: 'pending',
      type: 'rental'
    }
  ])
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getBookingsForDay = (day: Date) => {
    return bookings.filter(booking => isSameDay(booking.date, day))
  }

  const handleCancelBooking = (bookingId: number) => {
    if (confirm(t('calendar.cancelBookingConfirm'))) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      ))
      alert(t('calendar.bookingCancelledSuccess'))
    }
  }

  const handleRescheduleBooking = () => {
    alert(t('calendar.rescheduleFeatureComingSoon'))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const upcomingBookings = bookings
    .filter(booking => booking.date >= new Date() && booking.status !== 'cancelled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  const dayNames = [
    t('calendar.sun'),
    t('calendar.mon'),
    t('calendar.tue'),
    t('calendar.wed'),
    t('calendar.thu'),
    t('calendar.fri'),
    t('calendar.sat')
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {dayNames.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const dayBookings = getBookingsForDay(day)
                return (
                  <div
                    key={day.toISOString()}
                    className={`p-2 h-24 border border-gray-100 rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                      isToday(day) ? 'bg-orange-50 border-orange-200' : ''
                    } ${selectedDate && isSameDay(day, selectedDate) ? 'ring-2 ring-orange-500' : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`text-sm ${isToday(day) ? 'font-bold text-orange-600' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </div>
                    {/* Bookings for this day */}
                    <div className="mt-1 space-y-1">
                      {dayBookings.slice(0, 2).map((booking) => (
                        <div
                          key={booking.id}
                          className={`text-xs px-1 py-0.5 rounded truncate ${getStatusColor(booking.status)}`}
                        >
                          {booking.resourceName}
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dayBookings.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Selected Date Details */}
        {selectedDate && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </h3>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {getBookingsForDay(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getBookingsForDay(selectedDate).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div>
                      <h4 className="font-medium text-gray-900">{booking.resourceName}</h4>
                      <p className="text-sm text-gray-600">
                        {booking.time} - {booking.duration}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {t(`calendar.${booking.status}`)}
                      </span>
                      {booking.status === 'confirmed' && (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleRescheduleBooking()}
                            className="text-orange-600 hover:text-orange-800 text-sm"
                          >
                            {t('calendar.reschedule')}
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            {t('calendar.cancel')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">{t('calendar.noBookingsForDate')}</p>
            )}
          </div>
        )}
        
        {/* Upcoming Bookings */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('calendar.upcomingBookings')}</h3>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:shadow-sm transition-shadow">
                  <div>
                    <h4 className="font-medium text-gray-900">{booking.resourceName}</h4>
                    <p className="text-sm text-gray-600">
                      {format(booking.date, 'MMM d, yyyy')} at {booking.time} - {booking.duration}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                      {t(`calendar.${booking.status}`)}
                    </span>
                    {booking.status === 'confirmed' && (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleRescheduleBooking()}
                          className="text-orange-600 hover:text-orange-800 text-sm"
                        >
                          {t('calendar.reschedule')}
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          {t('calendar.cancel')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">{t('calendar.noUpcomingBookings')}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Calendar