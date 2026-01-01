import { kv } from '@vercel/kv'

// Promo code configuration
export const PROMOS = {
  'ABRACADABRA20': {
    code: 'ABRACADABRA20',
    discount: 100, // 100% off (free)
    type: 'percent',
    maxUses: 25,
    description: 'Free FOAM license giveaway',
    active: true,
    productId: 'foam-sampler',
    timedRelease: true,
    releaseDurationHours: 24,
    immediateReleases: 5
  },
  'ABRACADABRA': {
    code: 'ABRACADABRA',
    discount: 20, // 20% off ($25 -> $20)
    type: 'percent',
    maxUses: 1000,
    description: 'FOAM $20 promo price',
    active: true,
    productId: 'foam-sampler'
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
  },
  'KVRFOAM': {
    code: 'KVRFOAM',
    discount: 20, // 20% off ($25 -> $20)
    type: 'percent',
    maxUses: 1000,
    description: 'KVR Audio FOAM $20 promo',
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

  // Handle timed release promos
  if (promo.timedRelease) {
    return await isTimedReleaseAvailable(code)
  }

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

  const stats = {
    code: promo.code,
    description: promo.description,
    total: promo.maxUses,
    claimed: count,
    remaining: promo.maxUses - count,
    active: promo.active && count < promo.maxUses
  }

  // Add timed release info if applicable
  if (promo.timedRelease) {
    const timedStats = await getTimedReleaseStats(code)
    return { ...stats, ...timedStats }
  }

  return stats
}

/**
 * Initialize timed release schedule for a promo
 * Generates random release times spread over the duration
 */
export async function initializeTimedRelease(code) {
  const promo = getPromo(code)
  if (!promo || !promo.timedRelease) return null

  const scheduleKey = `promo:${code.toUpperCase()}:schedule`
  const startKey = `promo:${code.toUpperCase()}:start`

  // Check if already initialized
  const existingSchedule = await kv.get(scheduleKey)
  if (existingSchedule) {
    const startTime = await kv.get(startKey)
    return { schedule: existingSchedule, startTime }
  }

  // Generate random release times
  const now = Date.now()
  const durationMs = promo.releaseDurationHours * 60 * 60 * 1000
  const immediateCount = promo.immediateReleases || 0

  // Generate timestamps for each license
  const releaseTimes = []

  // First N licenses are available immediately
  for (let i = 0; i < immediateCount; i++) {
    releaseTimes.push(now)
  }

  // Remaining licenses released randomly over the duration
  for (let i = immediateCount; i < promo.maxUses; i++) {
    const randomTime = now + Math.random() * durationMs
    releaseTimes.push(randomTime)
  }

  // Sort chronologically
  releaseTimes.sort((a, b) => a - b)

  await kv.set(startKey, now)
  await kv.set(scheduleKey, releaseTimes)

  return { schedule: releaseTimes, startTime: now }
}

/**
 * Get timed release stats - how many released vs claimed
 */
export async function getTimedReleaseStats(code) {
  const promo = getPromo(code)
  if (!promo || !promo.timedRelease) return null

  const scheduleKey = `promo:${code.toUpperCase()}:schedule`
  const startKey = `promo:${code.toUpperCase()}:start`

  let schedule = await kv.get(scheduleKey)
  let startTime = await kv.get(startKey)

  // Initialize if not yet started
  if (!schedule) {
    const init = await initializeTimedRelease(code)
    if (init) {
      schedule = init.schedule
      startTime = init.startTime
    } else {
      return null
    }
  }

  const now = Date.now()
  const claimed = await getPromoRedemptionCount(code)

  // Count how many have been released (timestamp has passed)
  const released = schedule.filter(time => time <= now).length

  // Available = released but not yet claimed
  const availableNow = Math.max(0, released - claimed)

  // Find next release time
  const nextRelease = schedule.find(time => time > now)
  const durationMs = promo.releaseDurationHours * 60 * 60 * 1000
  const endTime = startTime + durationMs

  return {
    timedRelease: true,
    released,
    availableNow,
    claimed,
    totalLicenses: promo.maxUses,
    nextReleaseTime: nextRelease || null,
    promoEndTime: endTime,
    promoStartTime: startTime
  }
}

/**
 * Check if a timed release license is available to claim
 */
export async function isTimedReleaseAvailable(code) {
  const stats = await getTimedReleaseStats(code)
  if (!stats) return { available: false, error: 'Invalid promo' }

  if (stats.availableNow > 0) {
    return { available: true, availableNow: stats.availableNow }
  }

  if (stats.claimed >= stats.totalLicenses) {
    return { available: false, error: 'All licenses have been claimed', allClaimed: true }
  }

  return {
    available: false,
    error: 'No licenses available right now',
    nextReleaseTime: stats.nextReleaseTime,
    checkBackSoon: true
  }
}
