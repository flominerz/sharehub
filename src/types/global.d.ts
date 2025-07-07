import { SupabaseVerification } from '../utils/supabaseVerification'
import { SupabaseClient } from '@supabase/supabase-js'

declare global {
  interface Window {
    supabaseVerification: typeof SupabaseVerification
    supabase: SupabaseClient
  }
}

export {}