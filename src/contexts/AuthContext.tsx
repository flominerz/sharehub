import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { StorageManager } from '../utils/storage'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  provider: 'google' | 'email'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

declare global {
  interface Window {
    google: any
  }
}

// Simple in-memory user storage for demo purposes
// In a real app, this would be a proper backend database
const mockUsers: Array<{ email: string; password: string; name: string; id: string }> = []

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on app load with error handling
    try {
      const savedUser = StorageManager.getItem<User>('user')
      if (savedUser) {
        setUser(savedUser)
      }
    } catch (error) {
      console.error('Error loading saved user:', error)
      // Clear corrupted data
      StorageManager.removeItem('user')
    }

    // Initialize Google Sign-In
    const initializeGoogleAuth = () => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      
      // Check if we have a valid client ID (not the placeholder)
      if (!clientId || clientId === 'your_google_client_id_here') {
        console.warn('Google OAuth client ID not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file.')
        setIsLoading(false)
        return
      }

      if (window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          })
          setIsLoading(false)
        } catch (error) {
          console.error('Google Auth initialization failed:', error)
          setIsLoading(false)
        }
      } else {
        // Retry after a short delay if Google script hasn't loaded yet
        setTimeout(initializeGoogleAuth, 100)
      }
    }

    initializeGoogleAuth()
  }, [])

  const handleGoogleResponse = async (response: any) => {
    try {
      setIsLoading(true)
      
      // Decode the JWT token to get user information
      const payload = JSON.parse(atob(response.credential.split('.')[1]))
      
      const googleUser: User = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        provider: 'google'
      }
      
      setUser(googleUser)
      
      // Use StorageManager with error handling
      const success = StorageManager.setItem('user', googleUser)
      if (!success) {
        console.warn('Failed to save user session to storage')
        // Still allow the user to continue, just warn about session persistence
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
      
      // Check if we have a valid client ID
      if (!clientId || clientId === 'your_google_client_id_here') {
        throw new Error('Google OAuth not configured. Please set up your Google Client ID in the .env file.')
      }

      setIsLoading(true)
      
      if (window.google) {
        // Trigger Google Sign-In popup
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fallback to renderButton method if prompt doesn't work
            const buttonContainer = document.createElement('div')
            buttonContainer.style.position = 'fixed'
            buttonContainer.style.top = '-1000px'
            document.body.appendChild(buttonContainer)
            
            window.google.accounts.id.renderButton(buttonContainer, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
            })
            
            // Simulate click on the hidden button
            const button = buttonContainer.querySelector('div[role="button"]') as HTMLElement
            if (button) {
              button.click()
            }
            
            // Clean up
            setTimeout(() => {
              if (document.body.contains(buttonContainer)) {
                document.body.removeChild(buttonContainer)
              }
            }, 1000)
          }
        })
      } else {
        throw new Error('Google Sign-In not initialized')
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      setIsLoading(false)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true)
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email)
      if (existingUser) {
        throw new Error('User already exists with this email')
      }
      
      // Validate password
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }
      
      // Create new user
      const newUser = {
        id: 'email_' + Date.now(),
        email,
        password, // In a real app, this would be hashed
        name
      }
      
      mockUsers.push(newUser)
      
      // Create user session
      const user: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        provider: 'email'
      }
      
      setUser(user)
      
      // Use StorageManager with error handling
      const success = StorageManager.setItem('user', user)
      if (!success) {
        console.warn('Failed to save user session to storage')
      }
    } catch (error) {
      console.error('Email sign-up error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      
      // Find user
      const existingUser = mockUsers.find(u => u.email === email && u.password === password)
      if (!existingUser) {
        throw new Error('Invalid email or password')
      }
      
      // Create user session
      const user: User = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        provider: 'email'
      }
      
      setUser(user)
      
      // Use StorageManager with error handling
      const success = StorageManager.setItem('user', user)
      if (!success) {
        console.warn('Failed to save user session to storage')
      }
    } catch (error) {
      console.error('Email sign-in error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    StorageManager.removeItem('user')
    
    // Sign out from Google
    if (window.google) {
      try {
        window.google.accounts.id.disableAutoSelect()
      } catch (error) {
        console.error('Google sign-out error:', error)
      }
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}