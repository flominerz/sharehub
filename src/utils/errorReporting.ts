// Error reporting and monitoring utilities
export class ErrorReporter {
  private static readonly MAX_ERROR_LOGS = 50
  private static readonly ERROR_STORAGE_KEY = 'error_logs'

  static reportError(error: Error, context?: string, additionalData?: any) {
    const errorLog = {
      message: error.message,
      stack: error.stack,
      context,
      additionalData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      id: crypto.randomUUID?.() || Date.now().toString()
    }

    // Log to console
    console.error('Error reported:', errorLog)

    // Store locally for debugging
    try {
      const existingLogs = this.getStoredErrors()
      const updatedLogs = [...existingLogs, errorLog].slice(-this.MAX_ERROR_LOGS)
      localStorage.setItem(this.ERROR_STORAGE_KEY, JSON.stringify(updatedLogs))
    } catch (storageError) {
      console.warn('Failed to store error log:', storageError)
    }

    // In production, you would send this to your error tracking service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    if (process.env.NODE_ENV === 'production') {
      // this.sendToErrorService(errorLog)
    }
  }

  static getStoredErrors(): any[] {
    try {
      const logs = localStorage.getItem(this.ERROR_STORAGE_KEY)
      return logs ? JSON.parse(logs) : []
    } catch {
      return []
    }
  }

  static clearStoredErrors() {
    try {
      localStorage.removeItem(this.ERROR_STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear error logs:', error)
    }
  }

  static reportStorageError(operation: string, error: Error) {
    this.reportError(error, 'Storage Operation', { operation })
  }

  static reportNetworkError(url: string, error: Error) {
    this.reportError(error, 'Network Request', { url })
  }

  static reportAuthError(provider: string, error: Error) {
    this.reportError(error, 'Authentication', { provider })
  }

  // Hook for React components
  static useErrorReporter() {
    return {
      reportError: this.reportError,
      reportStorageError: this.reportStorageError,
      reportNetworkError: this.reportNetworkError,
      reportAuthError: this.reportAuthError
    }
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  ErrorReporter.reportError(
    new Error(event.message),
    'Global Error Handler',
    {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    }
  )
})

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  ErrorReporter.reportError(
    new Error(event.reason?.message || 'Unhandled Promise Rejection'),
    'Unhandled Promise Rejection',
    { reason: event.reason }
  )
})

export default ErrorReporter