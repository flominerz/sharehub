import React, { useState, useEffect } from 'react'
import { Database, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { SupabaseVerification } from '../utils/supabaseVerification'

const SupabaseDebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)

  const runVerification = async () => {
    setIsLoading(true)
    try {
      const verificationReport = await SupabaseVerification.generateVerificationReport()
      setReport(verificationReport)
    } catch (error) {
      console.error('Verification failed:', error)
      setReport({ error: error instanceof Error ? error.message : String(error) })
    } finally {
      setIsLoading(false)
    }
  }

  const runRegistrationTest = async () => {
    setIsLoading(true)
    try {
      const result = await SupabaseVerification.testUserRegistration()
      setTestResult(result)
    } catch (error) {
      console.error('Registration test failed:', error)
      setTestResult({ success: false, error: error instanceof Error ? error.message : String(error) })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && !report) {
      runVerification()
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        title="Open Supabase Debug Panel"
      >
        <Database className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-xl w-96 max-h-96 overflow-y-auto z-50">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Supabase Debug Panel
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Connection Status */}
        {report && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {report.connection?.connected ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm font-medium">
                Database Connection: {report.connection?.connected ? 'Connected' : 'Failed'}
              </span>
            </div>

            {/* Schema Status */}
            <div className="flex items-center space-x-2">
              {report.schema?.allTablesExist ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm font-medium">
                Database Schema: {report.schema?.allTablesExist ? 'Complete' : 'Missing Tables'}
              </span>
            </div>

            {/* Missing Tables */}
            {report.schema?.missingTables?.length > 0 && (
              <div className="ml-6 text-xs text-red-600">
                Missing: {report.schema.missingTables.join(', ')}
              </div>
            )}

            {/* RLS Status */}
            <div className="flex items-center space-x-2">
              {report.rls?.rlsWorking ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <span className="text-sm font-medium">
                RLS Policies: {report.rls?.rlsWorking ? 'Working' : 'Issues Detected'}
              </span>
            </div>

            {/* Auth Users */}
            <div className="flex items-center space-x-2">
              {report.authUsers?.exists ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <span className="text-sm font-medium">
                Auth Users: {report.authUsers?.count || 0} users
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={runVerification}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            <span>Verify Database</span>
          </button>

          <button
            onClick={runRegistrationTest}
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 px-3 rounded text-sm hover:bg-green-600 disabled:opacity-50"
          >
            Test Registration
          </button>
        </div>

        {/* Test Results */}
        {testResult && (
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center space-x-2 mb-2">
              {testResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm font-medium">
                Registration Test: {testResult.success ? 'Passed' : 'Failed'}
              </span>
            </div>
            {testResult.error && (
              <div className="text-xs text-red-600 ml-6">
                {testResult.error}
              </div>
            )}
          </div>
        )}

        {/* Recommendations */}
        {report?.recommendations?.length > 0 && (
          <div className="border-t border-gray-200 pt-3">
            <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
            <ul className="space-y-1">
              {report.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-xs text-gray-600">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default SupabaseDebugPanel