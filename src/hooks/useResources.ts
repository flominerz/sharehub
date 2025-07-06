import { useState, useEffect } from 'react'
import { authService } from '../lib/authService'

export interface Resource {
  id: string
  name: string
  description: string
  category_id: string
  category_name: string
  price: number
  price_type: 'hour' | 'day' | 'week' | 'service'
  location: string
  latitude?: number
  longitude?: number
  is_available: boolean
  features?: string[]
  images?: string[]
  rating: number
  total_reviews: number
  total_bookings: number
  owner_id: string
  owner_name: string
  created_at: string
  updated_at: string
}

export interface ResourceFilters {
  search?: string
  category?: string
  minRating?: number
  maxPrice?: number
  location?: string
}

export const useResources = (filters: ResourceFilters = {}) => {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResources = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = authService.supabase
        .from('resources')
        .select(`
          *,
          categories(name),
          profiles(name)
        `)
        .eq('is_available', true)

      // Apply filters
      if (filters.search) {
        query = query.textSearch('name,description', filters.search)
      }

      if (filters.category) {
        query = query.eq('category_id', filters.category)
      }

      if (filters.minRating) {
        query = query.gte('rating', filters.minRating)
      }

      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }

      const { data, error: fetchError } = await query
        .order('created_at', { ascending: false })
        .limit(50)

      if (fetchError) throw fetchError

      // Transform data to match our interface
      const transformedResources: Resource[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category_id: item.category_id,
        category_name: item.categories?.name || 'Unknown',
        price: item.price,
        price_type: item.price_type,
        location: item.location,
        latitude: item.latitude,
        longitude: item.longitude,
        is_available: item.is_available,
        features: item.features,
        images: item.images,
        rating: item.rating,
        total_reviews: item.total_reviews,
        total_bookings: item.total_bookings,
        owner_id: item.owner_id,
        owner_name: item.profiles?.name || 'Unknown',
        created_at: item.created_at,
        updated_at: item.updated_at
      }))

      setResources(transformedResources)
    } catch (err) {
      console.error('Error fetching resources:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch resources')
      
      // Fallback to mock data if database fails
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [filters.search, filters.category, filters.minRating, filters.maxPrice, filters.location])

  const createResource = async (resourceData: Partial<Resource>) => {
    try {
      const { data, error } = await authService.supabase
        .from('resources')
        .insert([resourceData])
        .select()
        .single()

      if (error) throw error

      // Refresh resources list
      await fetchResources()
      
      return data
    } catch (err) {
      console.error('Error creating resource:', err)
      throw err
    }
  }

  const updateResource = async (id: string, updates: Partial<Resource>) => {
    try {
      const { data, error } = await authService.supabase
        .from('resources')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Refresh resources list
      await fetchResources()
      
      return data
    } catch (err) {
      console.error('Error updating resource:', err)
      throw err
    }
  }

  const deleteResource = async (id: string) => {
    try {
      const { error } = await authService.supabase
        .from('resources')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Refresh resources list
      await fetchResources()
    } catch (err) {
      console.error('Error deleting resource:', err)
      throw err
    }
  }

  return {
    resources,
    loading,
    error,
    refetch: fetchResources,
    createResource,
    updateResource,
    deleteResource
  }
}