/**
 * ShareHub Data Migration Validator
 * 
 * This script validates the data migration by checking:
 * 1. Data integrity and relationships
 * 2. Data type consistency
 * 3. Required fields and constraints
 * 4. Business logic validation
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

class DataMigrationValidator {
  constructor() {
    this.errors = []
    this.warnings = []
    this.stats = {}
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString()
    const prefix = {
      info: '📋',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type] || '📋'
    
    console.log(`${prefix} [${timestamp}] ${message}`)
  }

  addError(message) {
    this.errors.push(message)
    this.log(message, 'error')
  }

  addWarning(message) {
    this.warnings.push(message)
    this.log(message, 'warning')
  }

  async validateTableCounts() {
    this.log('Validating table record counts...')
    
    const tables = [
      { name: 'profiles', expected: 8 },
      { name: 'categories', expected: 6 },
      { name: 'resources', expected: 8 },
      { name: 'bookings', expected: 3 },
      { name: 'reviews', expected: 3 },
      { name: 'conversations', expected: 2 },
      { name: 'messages', expected: 4 },
      { name: 'favorites', expected: 3 }
    ]

    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table.name)
          .select('*', { count: 'exact', head: true })

        if (error) {
          this.addError(`Failed to count ${table.name}: ${error.message}`)
          continue
        }

        this.stats[table.name] = count
        
        if (count < table.expected) {
          this.addWarning(`${table.name} has ${count} records, expected at least ${table.expected}`)
        } else {
          this.log(`${table.name}: ${count} records ✓`, 'success')
        }
      } catch (err) {
        this.addError(`Error validating ${table.name}: ${err.message}`)
      }
    }
  }

  async validateDataIntegrity() {
    this.log('Validating data integrity and relationships...')

    // Check foreign key relationships
    await this.validateForeignKeys()
    
    // Check data consistency
    await this.validateDataConsistency()
    
    // Check business rules
    await this.validateBusinessRules()
  }

  async validateForeignKeys() {
    this.log('Checking foreign key relationships...')

    // Resources should have valid owner_id and category_id
    const { data: orphanedResources, error: resourceError } = await supabase
      .from('resources')
      .select(`
        id, name, owner_id, category_id,
        profiles!resources_owner_id_fkey(id),
        categories!resources_category_id_fkey(id)
      `)

    if (resourceError) {
      this.addError(`Failed to validate resource relationships: ${resourceError.message}`)
    } else {
      const invalidResources = orphanedResources.filter(r => !r.profiles || !r.categories)
      if (invalidResources.length > 0) {
        this.addError(`Found ${invalidResources.length} resources with invalid relationships`)
      } else {
        this.log('All resources have valid owner and category relationships ✓', 'success')
      }
    }

    // Bookings should have valid resource_id, renter_id, and owner_id
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        id, resource_id, renter_id, owner_id,
        resources!bookings_resource_id_fkey(id),
        renter:profiles!bookings_renter_id_fkey(id),
        owner:profiles!bookings_owner_id_fkey(id)
      `)

    if (bookingError) {
      this.addError(`Failed to validate booking relationships: ${bookingError.message}`)
    } else {
      const invalidBookings = bookings.filter(b => !b.resources || !b.renter || !b.owner)
      if (invalidBookings.length > 0) {
        this.addError(`Found ${invalidBookings.length} bookings with invalid relationships`)
      } else {
        this.log('All bookings have valid relationships ✓', 'success')
      }
    }
  }

  async validateDataConsistency() {
    this.log('Checking data consistency...')

    // Check that resource ratings match review averages
    const { data: resources, error: resourceError } = await supabase
      .from('resources')
      .select(`
        id, name, rating, total_reviews,
        reviews(rating)
      `)

    if (resourceError) {
      this.addError(`Failed to validate resource ratings: ${resourceError.message}`)
    } else {
      for (const resource of resources) {
        if (resource.reviews.length > 0) {
          const avgRating = resource.reviews.reduce((sum, r) => sum + r.rating, 0) / resource.reviews.length
          const roundedAvg = Math.round(avgRating * 100) / 100
          
          if (Math.abs(resource.rating - roundedAvg) > 0.01) {
            this.addWarning(`Resource ${resource.name} rating mismatch: stored=${resource.rating}, calculated=${roundedAvg}`)
          }
          
          if (resource.total_reviews !== resource.reviews.length) {
            this.addWarning(`Resource ${resource.name} review count mismatch: stored=${resource.total_reviews}, actual=${resource.reviews.length}`)
          }
        }
      }
      this.log('Resource rating consistency checked ✓', 'success')
    }
  }

  async validateBusinessRules() {
    this.log('Validating business rules...')

    // Check that booking dates are valid
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('id, start_date, end_date, duration_days, total_price')

    if (bookingError) {
      this.addError(`Failed to validate booking rules: ${bookingError.message}`)
    } else {
      for (const booking of bookings) {
        const startDate = new Date(booking.start_date)
        const endDate = new Date(booking.end_date)
        
        if (endDate < startDate) {
          this.addError(`Booking ${booking.id} has end_date before start_date`)
        }
        
        if (booking.total_price <= 0) {
          this.addError(`Booking ${booking.id} has invalid price: ${booking.total_price}`)
        }
        
        if (booking.duration_days <= 0) {
          this.addError(`Booking ${booking.id} has invalid duration: ${booking.duration_days}`)
        }
      }
      this.log('Booking business rules validated ✓', 'success')
    }

    // Check that users cannot book their own resources
    const { data: selfBookings, error: selfBookingError } = await supabase
      .from('bookings')
      .select('id, renter_id, owner_id')
      .eq('renter_id', 'owner_id')

    if (selfBookingError) {
      this.addError(`Failed to check self-booking rule: ${selfBookingError.message}`)
    } else if (selfBookings.length > 0) {
      this.addError(`Found ${selfBookings.length} bookings where users booked their own resources`)
    } else {
      this.log('No self-bookings found ✓', 'success')
    }
  }

  async validateDataTypes() {
    this.log('Validating data types and constraints...')

    // Check email formats
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, rating, total_reviews')

    if (profileError) {
      this.addError(`Failed to validate profile data: ${profileError.message}`)
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      
      for (const profile of profiles) {
        if (!emailRegex.test(profile.email)) {
          this.addError(`Profile ${profile.id} has invalid email: ${profile.email}`)
        }
        
        if (profile.rating < 0 || profile.rating > 5) {
          this.addError(`Profile ${profile.id} has invalid rating: ${profile.rating}`)
        }
        
        if (profile.total_reviews < 0) {
          this.addError(`Profile ${profile.id} has negative review count: ${profile.total_reviews}`)
        }
      }
      this.log('Profile data types validated ✓', 'success')
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalErrors: this.errors.length,
        totalWarnings: this.warnings.length,
        tablesValidated: Object.keys(this.stats).length,
        overallStatus: this.errors.length === 0 ? 'PASSED' : 'FAILED'
      },
      statistics: this.stats,
      errors: this.errors,
      warnings: this.warnings
    }

    // Write report to file
    const reportPath = path.join(process.cwd(), 'migration-validation-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    this.log(`Validation report saved to: ${reportPath}`)
    
    return report
  }

  async runFullValidation() {
    this.log('Starting comprehensive data migration validation...')
    
    try {
      await this.validateTableCounts()
      await this.validateDataIntegrity()
      await this.validateDataTypes()
      
      const report = await this.generateReport()
      
      this.log('='.repeat(60))
      this.log(`VALIDATION SUMMARY`)
      this.log('='.repeat(60))
      this.log(`Status: ${report.summary.overallStatus}`)
      this.log(`Errors: ${report.summary.totalErrors}`)
      this.log(`Warnings: ${report.summary.totalWarnings}`)
      this.log(`Tables Validated: ${report.summary.tablesValidated}`)
      
      if (report.summary.totalErrors === 0) {
        this.log('🎉 Data migration validation completed successfully!', 'success')
      } else {
        this.log('❌ Data migration validation failed. Please review errors above.', 'error')
      }
      
      return report
    } catch (error) {
      this.addError(`Validation failed with error: ${error.message}`)
      throw error
    }
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new DataMigrationValidator()
  validator.runFullValidation()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export default DataMigrationValidator