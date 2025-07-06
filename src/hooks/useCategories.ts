import { useState, useEffect } from 'react'
import { authService } from '../lib/authService'

export interface Category {
  id: string
  name: string
  description?: string
  icon?: string
  created_at: string
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await authService.supabase
          .from('categories')
          .select('*')
          .order('name')

        if (fetchError) throw fetchError

        setCategories(data || [])
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch categories')
        
        // Fallback to default categories
        setCategories([
          { id: '1', name: 'Tools', description: 'Power tools and equipment', icon: 'wrench', created_at: new Date().toISOString() },
          { id: '2', name: 'Skills', description: 'Professional services and tutoring', icon: 'lightbulb', created_at: new Date().toISOString() },
          { id: '3', name: 'Vehicles', description: 'Cars, bikes, and transportation', icon: 'truck', created_at: new Date().toISOString() },
          { id: '4', name: 'Spaces', description: 'Meeting rooms and storage', icon: 'building', created_at: new Date().toISOString() },
          { id: '5', name: 'Services', description: 'Professional services', icon: 'users', created_at: new Date().toISOString() },
          { id: '6', name: 'Equipment', description: 'Cameras and electronics', icon: 'camera', created_at: new Date().toISOString() }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}