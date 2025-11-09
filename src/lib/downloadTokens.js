import { kv } from '@vercel/kv'
import crypto from 'crypto'

const TOKEN_EXPIRY_DAYS = 30

/**
 * Generate a secure download token
 * @param {string} sessionId - Stripe session ID
 * @param {string} productId - Product ID
 * @param {string} customerEmail - Customer email
 * @returns {Promise<string>} - Download token
 */
export async function generateDownloadToken(sessionId, productId, customerEmail) {
  // Generate random token
  const token = crypto.randomBytes(32).toString('hex')

  // Token data to store
  const tokenData = {
    sessionId,
    productId,
    customerEmail,
    createdAt: Date.now(),
    expiresAt: Date.now() + (TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
  }

  try {
    // Store in Vercel KV with expiration
    await kv.set(`download:${token}`, JSON.stringify(tokenData), {
      ex: TOKEN_EXPIRY_DAYS * 24 * 60 * 60 // seconds
    })

    // Also store by email for lookup (store array of tokens)
    const emailKey = `email:${customerEmail.toLowerCase()}`
    const existingTokens = await kv.get(emailKey) || []
    existingTokens.push(token)
    await kv.set(emailKey, existingTokens, {
      ex: TOKEN_EXPIRY_DAYS * 24 * 60 * 60
    })

    return token
  } catch (error) {
    console.error('Error storing token in KV:', error)
    // Fallback: return session ID if KV fails (backwards compatibility)
    return sessionId
  }
}

/**
 * Verify and retrieve download token data
 * @param {string} token - Download token
 * @returns {Promise<object|null>} - Token data or null if invalid/expired
 */
export async function verifyDownloadToken(token) {
  try {
    const data = await kv.get(`download:${token}`)

    if (!data) {
      return null
    }

    const tokenData = typeof data === 'string' ? JSON.parse(data) : data

    // Check if expired
    if (Date.now() > tokenData.expiresAt) {
      return null
    }

    return tokenData
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

/**
 * Get all tokens for an email address
 * @param {string} email - Customer email
 * @returns {Promise<Array>} - Array of token data
 */
export async function getTokensByEmail(email) {
  try {
    const emailKey = `email:${email.toLowerCase()}`
    const tokens = await kv.get(emailKey) || []

    const tokenDataList = []
    for (const token of tokens) {
      const data = await verifyDownloadToken(token)
      if (data) {
        tokenDataList.push({ token, ...data })
      }
    }

    return tokenDataList
  } catch (error) {
    console.error('Error getting tokens by email:', error)
    return []
  }
}

/**
 * Create a download URL with token
 * @param {string} token - Download token
 * @param {string} productId - Product ID
 * @param {string} platform - Platform (macos, windows, linux)
 * @returns {string} - Full download URL
 */
export function createDownloadUrl(token, productId, platform = 'macos') {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}/api/download?token=${token}&product_id=${productId}&platform=${platform}`
}

/**
 * Create a success page URL with token
 * @param {string} token - Download token
 * @param {string} productId - Product ID
 * @returns {string} - Full success page URL
 */
export function createSuccessPageUrl(token, productId) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}/success?token=${token}&product_id=${productId}`
}
