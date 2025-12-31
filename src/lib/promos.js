import { kv } from '@vercel/kv'

// Promo code configuration
export const PROMOS = {
  'ABRACADABRA11': {
    code: 'ABRACADABRA11',
    discount: 100, // 100% off (free)
    type: 'percent',
    maxUses: 11,
    description: 'Free license giveaway',
    active: true,
    productId: 'midi-warp' // Only valid for VEX
  },
  'SECRETSTASH11': {
    code: 'SECRETSTASH11',
    discount: 100, // 100% off (free)
    type: 'percent',
    maxUses: 11,
    description: 'Secret stash giveaway',
    active: true,
    productId: 'midi-warp'
  },
  'KVRAUDIO11': {
    code: 'KVRAUDIO11',
    discount: 100, // 100% off (free)
    type: 'percent',
    maxUses: 11,
    description: 'KVR Audio giveaway',
    active: true,
    productId: 'midi-warp'
  },
  'FREEFOAM11': {
    code: 'FREEFOAM11',
    discount: 100, // 100% off (free)
    type: 'percent',
    maxUses: 11,
    description: 'Free FOAM giveaway',
    active: true,
    productId: 'foam-sampler'
  }
}

/**
 * Get promo by code
 */
export function getPromo(code) {
  const promo = PROMOS[code?.toUpperCase()]
  return promo && promo.active ? promo : null
}

/**
 * Get current redemption count for a promo
 */
export async function getPromoRedemptionCount(code) {
  const key = `promo:${code.toUpperCase()}:count`
  const count = await kv.get(key)
  return count || 0
}

/**
 * Check if promo is still available
 */
export async function isPromoAvailable(code) {
  const promo = getPromo(code)
  if (!promo) return { available: false, error: 'Invalid promo code' }

  const count = await getPromoRedemptionCount(code)
  const remaining = promo.maxUses - count

  if (remaining <= 0) {
    return { available: false, error: 'Promo code has been fully redeemed', remaining: 0 }
  }

  return { available: true, remaining, total: promo.maxUses }
}

/**
 * Validate and reserve a promo code (atomic operation)
 * Returns the promo if valid and available, null otherwise
 */
export async function validateAndReservePromo(code, email) {
  const promo = getPromo(code)
  if (!promo) return { success: false, error: 'Invalid promo code' }

  const countKey = `promo:${code.toUpperCase()}:count`
  const emailKey = `promo:${code.toUpperCase()}:emails`

  // Check if email already used this promo
  const usedEmails = await kv.get(emailKey) || []
  if (usedEmails.includes(email.toLowerCase())) {
    return { success: false, error: 'You have already used this promo code' }
  }

  // Get current count
  const count = await kv.get(countKey) || 0

  if (count >= promo.maxUses) {
    return { success: false, error: 'Promo code has been fully redeemed' }
  }

  // Increment count and store email
  await kv.set(countKey, count + 1)
  usedEmails.push(email.toLowerCase())
  await kv.set(emailKey, usedEmails)

  return { success: true, promo }
}

/**
 * Record successful promo redemption (called after successful checkout)
 * Increments the count and logs the redemption
 */
export async function recordPromoRedemption(code, email, sessionId) {
  const countKey = `promo:${code.toUpperCase()}:count`
  const redemptionKey = `promo:${code.toUpperCase()}:redemptions`
  const emailKey = `promo:${code.toUpperCase()}:emails`

  // Increment the count
  const currentCount = await kv.get(countKey) || 0
  await kv.set(countKey, currentCount + 1)

  // Track email to prevent double claims
  const usedEmails = await kv.get(emailKey) || []
  if (!usedEmails.includes(email.toLowerCase())) {
    usedEmails.push(email.toLowerCase())
    await kv.set(emailKey, usedEmails)
  }

  // Log redemption details
  const redemptions = await kv.get(redemptionKey) || []
  redemptions.push({
    email: email.toLowerCase(),
    sessionId,
    redeemedAt: Date.now()
  })
  await kv.set(redemptionKey, redemptions)
}

/**
 * Get promo stats (for admin/display)
 */
export async function getPromoStats(code) {
  const promo = getPromo(code)
  if (!promo) return null

  const count = await getPromoRedemptionCount(code)

  return {
    code: promo.code,
    description: promo.description,
    total: promo.maxUses,
    claimed: count,
    remaining: promo.maxUses - count,
    active: promo.active && count < promo.maxUses
  }
}
