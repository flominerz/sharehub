import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../lib/authService'
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
  updateProfile: (updates: Partial<User>) => Promise<void>
  uploadAvatar: (file: File) => Promise<string>
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        setIsLoading(true)
        
        // Check for existing session
        const session = await authService.getSession()
        
        if (session?.user) {
          // Get user profile from database
          const profile = await authService.getUserProfile(session.user.id)
          
          const userData: User = {
            id: session.user.id,
            name: profile?.name || session.user.user_metadata?.name || session.user.email || '',
            email: session.user.email || '',
            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url,
            provider: session.user.app_metadata?.provider === 'google' ? 'google' : 'email'
          }
          
          setUser(userData)
          StorageManager.setItem('user', userData)
        } else {
          // Check for stored user (fallback)
          const savedUser = StorageManager.getItem<User>('user')
          if (savedUser) {
            setUser(savedUser)
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        // Clear potentially corrupted data
        StorageManager.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const profile = await authService.getUserProfile(session.user.id)
          
          const userData: User = {
            id: session.user.id,
            name: profile?.name || session.user.user_metadata?.name || session.user.email || '',
            email: session.user.email || '',
            avatar: profile?.avatar_url || session.user.user_metadata?.avatar_url,
            provider: session.user.app_metadata?.provider === 'google' ? 'google' : 'email'
          }
          
          setUser(userData)
          StorageManager.setItem('user', userData)
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        StorageManager.removeItem('user')
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true)
      await authService.signInWithGoogle()
      // User state will be updated by the auth state change listener
    } catch (error) {
      console.error('Google sign-in error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true)
      const data = await authService.signUp(email, password, name)
      
      if (data.user) {
        const userData: User = {
          id: data.user.id,
          name: name,
          email: email,
          provider: 'email'
        }
        
        setUser(userData)
        StorageManager.setItem('user', userData)
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
      await authService.signIn(email, password)
      // User state will be updated by the auth state change listener
    } catch (error) {
      console.error('Email sign-in error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
      setUser(null)
      StorageManager.removeItem('user')
    } catch (error) {
      console.error('Sign-out error:', error)
      // Force local sign out even if remote fails
      setUser(null)
      StorageManager.removeItem('user')
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in')
    
    try {
      // Update profile in Supabase
      const { error } = await authService.supabase
        .from('profiles')
        .update({
          name: updates.name,
          avatar_url: updates.avatar,
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      // Update local state
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      StorageManager.setItem('user', updatedUser)
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  }

  const uploadAvatar = async (file: File): Promise<string> => {
    if (!user) throw new Error('No user logged in')
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error } = await authService.supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (error) throw error

      const { data: { publicUrl } } = authService.supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Avatar upload error:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateProfile,
    uploadAvatar
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}