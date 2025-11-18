import crypto from 'crypto'
import { kv } from '@vercel/kv'

/**
 * License Key Generation and Management
 *
 * Compatible with VEX MIDI EXPRESSION plugin licensing system
 * Algorithm matches: midi-warp/scripts/generate_license.py
 * Validated by: midi-warp/scripts/test_license_compat.cjs
 */

/**
 * Calculate checksum for license key
 * Must match Python script: scripts/generate_license.py
 * Algorithm: SHA-256 hash of (prefix + keyData), first 4 chars uppercase
 */
function calculateChecksum(prefix, keyData) {
  const combined = prefix + keyData
  const hash = crypto
    .createHash('sha256')
    .update(combined, 'utf-8')
    .digest('hex')
    .toUpperCase()
  return hash.substring(0, 4) // First 4 characters
}

/**
 * Generate random alphanumeric key data
 * Characters: A-Z, 0-9 (36 chars)
 */
function generateKeyData(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  const randomBytes = crypto.randomBytes(length)

  for (let i = 0; i < length; i++) {
    result += chars[randomBytes[i] % chars.length]
  }

  return result
}

/**
 * Generate complete license key
 * Format: VXME-XXXX-XXXX-XXXX
 * Structure: PREFIX(4) + KEYDATA(8) + CHECKSUM(4) = 16 chars
 *
 * @returns {string} Formatted license key (e.g., "VXME-A1B2-C3D4-E5F6")
 */
export function generateLicenseKey() {
  const prefix = 'VXME'
  const keyData = generateKeyData(8)
  const checksum = calculateChecksum(prefix, keyData)

  // Full key: VXME + 8 chars + 4 char checksum
  const fullKey = prefix + keyData + checksum

  // Format: VXME-XXXX-XXXX-XXXX
  return [
    fullKey.substring(0, 4),   // VXME
    fullKey.substring(4, 8),   // First 4 of keyData
    fullKey.substring(8, 12),  // Last 4 of keyData
    fullKey.substring(12, 16)  // Checksum
  ].join('-')
}

/**
 * Validate license key format and checksum
 *
 * @param {string} key - License key to validate
 * @returns {object} { valid: boolean, error?: string }
 */
export function validateLicenseKey(key) {
  // Remove hyphens and spaces
  const normalized = key.replace(/[-\s]/g, '').toUpperCase()

  // Check length
  if (normalized.length !== 16) {
    return { valid: false, error: 'Invalid key length (expected 16 chars)' }
  }

  // Check prefix
  if (!normalized.startsWith('VXME')) {
    return { valid: false, error: 'Invalid key prefix (expected VXME)' }
  }

  // Extract parts
  const prefix = normalized.substring(0, 4)
  const keyData = normalized.substring(4, 12)
  const checksum = normalized.substring(12, 16)

  // Calculate expected checksum
  const expectedChecksum = calculateChecksum(prefix, keyData)

  if (checksum !== expectedChecksum) {
    return {
      valid: false,
      error: `Invalid checksum (expected ${expectedChecksum}, got ${checksum})`
    }
  }

  return { valid: true }
}

/**
 * Store license in Vercel KV
 * Creates multiple indexes for efficient lookup:
 * - license:{key} - Full license data
 * - session:{sessionId}:license - Session to license mapping
 * - email:{email}:licenses - Email to licenses array
 * - product:{productId}:licenses - Product to licenses array (admin)
 *
 * @param {string} licenseKey - Generated license key
 * @param {string} sessionId - Stripe session ID
 * @param {string} productId - Product ID
 * @param {string} customerEmail - Customer email
 * @returns {Promise<object>} License data object
 */
export async function storeLicense(licenseKey, sessionId, productId, customerEmail) {
  const licenseData = {
    licenseKey,
    sessionId,
    customerEmail,
    productId,
    purchaseDate: Date.now(),
    issuedAt: Date.now(),
    status: 'active',
    type: 'perpetual'
  }

  try {
    // Store license by key
    await kv.set(`license:${licenseKey}`, JSON.stringify(licenseData))

    // Store by session ID (for quick lookup on success page)
    await kv.set(`session:${sessionId}:license`, licenseKey)

    // Add to email's license list
    const emailKey = `email:${customerEmail.toLowerCase()}:licenses`
    const existingLicenses = await kv.get(emailKey) || []
    existingLicenses.push(licenseKey)
    await kv.set(emailKey, existingLicenses)

    // Add to product's license list (for admin analytics)
    const productKey = `product:${productId}:licenses`
    const productLicenses = await kv.get(productKey) || []
    productLicenses.push(licenseKey)
    await kv.set(productKey, productLicenses)

    console.log('License stored successfully:', licenseKey)
    return licenseData
  } catch (error) {
    console.error('Error storing license:', error)
    throw error
  }
}

/**
 * Get license by key
 *
 * @param {string} key - License key
 * @returns {Promise<object|null>} License data or null
 */
export async function getLicenseByKey(key) {
  try {
    const data = await kv.get(`license:${key}`)
    return data ? (typeof data === 'string' ? JSON.parse(data) : data) : null
  } catch (error) {
    console.error('Error getting license:', error)
    return null
  }
}

/**
 * Get all licenses for an email
 *
 * @param {string} email - Customer email
 * @returns {Promise<Array>} Array of license data objects
 */
export async function getLicensesByEmail(email) {
  try {
    const emailKey = `email:${email.toLowerCase()}:licenses`
    const keys = await kv.get(emailKey) || []

    const licenses = []
    for (const key of keys) {
      const license = await getLicenseByKey(key)
      if (license) {
        licenses.push(license)
      }
    }

    return licenses
  } catch (error) {
    console.error('Error getting licenses by email:', error)
    return []
  }
}

/**
 * Get license by session ID
 * Used on success page to display license after purchase
 *
 * @param {string} sessionId - Stripe session ID
 * @returns {Promise<object|null>} License data or null
 */
export async function getLicenseBySession(sessionId) {
  try {
    const licenseKey = await kv.get(`session:${sessionId}:license`)
    if (!licenseKey) return null

    return await getLicenseByKey(licenseKey)
  } catch (error) {
    console.error('Error getting license by session:', error)
    return null
  }
}
