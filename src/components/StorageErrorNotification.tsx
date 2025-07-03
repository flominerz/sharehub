import { useState, useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { useStorage } from '../utils/storage'

const StorageErrorNotification = () => {
  const { storageError, clearError } = useStorage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (storageError) {
      setIsVisible(true)
    }
  }, [storageError])

  const handleClose = () => {
    setIsVisible(false)
    clearError()
  }

  if (!isVisible || !storageError) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-yellow-800">Storage Warning</h4>
            <p className="text-sm text-yellow-700 mt-1">{storageError}</p>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => {
                  localStorage.clear()
                  window.location.reload()
                }}
                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200 transition-colors"
              >
                Clear Storage
              </button>
              <button
                onClick={handleClose}
                className="text-xs text-yellow-600 hover:text-yellow-800"
              >
                Dismiss
              </button>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-yellow-400 hover:text-yellow-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default StorageErrorNotification