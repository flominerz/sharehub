import { supabase } from '../lib/supabase'

// Database verification utilities
const dbVerification = {
  async verifyTables() {
    const tableResults: Record<string, boolean> = {}
    
    const tables = [
      'profiles',
      'categories', 
      'resources',
      'bookings',
      'reviews',
      'conversations',
      'messages',
      'favorites'
    ]

    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .select('*')
          .limit(1)
        
        tableResults[table] = !error
      } catch (error) {
        tableResults[table] = false
      }
    }

    return tableResults
  },

  async testRegistration(email: string, password: string, name: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      })

      if (error) {
        return {
          success: false,
          error: error.message
        }
      }

      return {
        success: true,
        userId: data.user?.id,
        user: data.user
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  },

  async verifyAuthUsers() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      return {
        canAccessAuth: !error,
        currentUser: user,
        error: error?.message
      }
    } catch (error) {
      return {
        canAccessAuth: false,
        currentUser: null,
        error: error.message
      }
    }
  }
}

// Comprehensive verification utility
export class SupabaseVerification {
  
  // Check database connection
  static async checkConnection() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)

      return {
        connected: !error,
        error: error?.message
      }
    } catch (error) {
      return {
        connected: false,
        error: error.message
      }
    }
  }

  // Verify all required tables exist
  static async verifyDatabaseSchema() {
    const tableResults = await dbVerification.verifyTables()
    
    const requiredTables = [
      'profiles',
      'categories',
      'resources', 
      'bookings',
      'reviews',
      'conversations',
      'messages',
      'favorites'
    ]

    const missingTables = requiredTables.filter(table => !tableResults[table])
    
    return {
      allTablesExist: missingTables.length === 0,
      existingTables: Object.keys(tableResults).filter(table => tableResults[table]),
      missingTables,
      tableResults
    }
  }

  // Test user registration flow
  static async testUserRegistration() {
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'TestPassword123!'
    const testName = 'Test User'

    try {
      console.log('🧪 Testing user registration flow...')
      
      // Test registration
      const result = await dbVerification.testRegistration(testEmail, testPassword, testName)
      
      if (result.success) {
        console.log('✅ Registration test passed')
        
        // Clean up test user (optional)
        try {
          await supabase.auth.admin.deleteUser(result.userId)
          console.log('🧹 Test user cleaned up')
        } catch (cleanupError) {
          console.warn('⚠️ Could not clean up test user:', cleanupError)
        }
      } else {
        console.log('❌ Registration test failed:', result.error)
      }

      return result
    } catch (error) {
      console.error('❌ Registration test error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Check RLS policies
  static async verifyRLSPolicies() {
    try {
      // Test if we can read from profiles (should work for authenticated users)
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)

      return {
        rlsWorking: !error || error.code !== 'PGRST116', // PGRST116 = RLS policy violation
        error: error?.message
      }
    } catch (error) {
      return {
        rlsWorking: false,
        error: error.message
      }
    }
  }

  // Complete verification report
  static async generateVerificationReport() {
    console.log('🔍 Generating Supabase verification report...')
    
    const connection = await this.checkConnection()
    const schema = await this.verifyDatabaseSchema()
    const rls = await this.verifyRLSPolicies()
    const authUsers = await dbVerification.verifyAuthUsers()

    const report = {
      timestamp: new Date().toISOString(),
      connection,
      schema,
      rls,
      authUsers,
      recommendations: []
    }

    // Generate recommendations
    if (!connection.connected) {
      report.recommendations.push('❌ Fix database connection - check environment variables')
    }

    if (!schema.allTablesExist) {
      report.recommendations.push(`❌ Create missing tables: ${schema.missingTables.join(', ')}`)
    }

    if (!rls.rlsWorking) {
      report.recommendations.push('❌ Fix RLS policies - users cannot access data')
    }

    if (schema.allTablesExist && connection.connected) {
      report.recommendations.push('✅ Database schema is properly set up')
    }

    console.log('📊 Verification Report:', report)
    return report
  }

  // Quick health check
  static async quickHealthCheck() {
    try {
      const connection = await this.checkConnection()
      const schema = await this.verifyDatabaseSchema()
      
      const isHealthy = connection.connected && schema.allTablesExist
      
      return {
        healthy: isHealthy,
        issues: [
          ...(connection.connected ? [] : ['Database connection failed']),
          ...(schema.allTablesExist ? [] : [`Missing tables: ${schema.missingTables.join(', ')}`])
        ]
      }
    } catch (error) {
      return {
        healthy: false,
        issues: [`Health check failed: ${error.message}`]
      }
    }
  }
}

// Export verification functions for console testing
if (typeof window !== 'undefined') {
  window.supabaseVerification = SupabaseVerification
  window.supabase = supabase
}