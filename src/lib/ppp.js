// Purchasing Power Parity (PPP) pricing configuration
// Generous tier: 30-70% discounts based on economic factors

// Country codes grouped by discount tier
const PPP_TIERS = {
  // Tier 1: 70% discount - lowest income countries
  70: [
    'AF', 'BD', 'BJ', 'BF', 'BI', 'KH', 'CF', 'TD', 'KM', 'CD', 'DJ', 'ER',
    'ET', 'GM', 'GN', 'GW', 'HT', 'KE', 'KG', 'LA', 'LS', 'LR', 'MG', 'MW',
    'ML', 'MR', 'MZ', 'MM', 'NP', 'NE', 'NG', 'PK', 'RW', 'SN', 'SL', 'SO',
    'SS', 'SD', 'TJ', 'TZ', 'TG', 'UG', 'UZ', 'YE', 'ZM', 'ZW'
  ],

  // Tier 2: 60% discount - low income countries
  60: [
    'DZ', 'AO', 'AM', 'AZ', 'BO', 'BW', 'CM', 'CV', 'CI', 'CU', 'EC', 'EG',
    'SV', 'GQ', 'FJ', 'GA', 'GE', 'GH', 'GT', 'GY', 'HN', 'IN', 'ID', 'IR',
    'IQ', 'JM', 'JO', 'KZ', 'LB', 'LY', 'MN', 'MA', 'NA', 'NI', 'OM', 'PG',
    'PY', 'PE', 'PH', 'MD', 'LK', 'SR', 'SZ', 'SY', 'TH', 'TN', 'TM', 'UA',
    'VE', 'VN', 'PS'
  ],

  // Tier 3: 50% discount - lower-middle income
  50: [
    'AL', 'AR', 'BY', 'BA', 'BR', 'BG', 'CN', 'CO', 'CR', 'DO', 'MK', 'MY',
    'MU', 'MX', 'ME', 'PA', 'RO', 'RS', 'ZA', 'TT', 'TR'
  ],

  // Tier 4: 40% discount - middle income
  40: [
    'CL', 'HR', 'CY', 'CZ', 'EE', 'GR', 'HU', 'LV', 'LT', 'MT', 'PL', 'PT',
    'SK', 'SI', 'KR', 'TW', 'UY'
  ],

  // Tier 5: 30% discount - upper-middle income
  30: [
    'ES', 'IT', 'JP', 'NZ', 'SG', 'AE', 'SA', 'KW', 'QA', 'BH', 'IL'
  ]

  // No discount: US, CA, UK, AU, DE, FR, NL, BE, AT, CH, SE, NO, DK, FI, IE, LU
}

// Build reverse lookup: country code -> discount percentage
const COUNTRY_DISCOUNTS = {}
for (const [discount, countries] of Object.entries(PPP_TIERS)) {
  for (const country of countries) {
    COUNTRY_DISCOUNTS[country] = parseInt(discount)
  }
}

/**
 * Get PPP discount for a country
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code
 * @returns {number} Discount percentage (0-70)
 */
export function getPPPDiscount(countryCode) {
  if (!countryCode) return 0
  return COUNTRY_DISCOUNTS[countryCode.toUpperCase()] || 0
}

/**
 * Calculate PPP-adjusted price
 * @param {number} originalPrice - Price in cents
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code
 * @returns {{ price: number, discount: number, countryCode: string }}
 */
export function calculatePPPPrice(originalPrice, countryCode) {
  const discount = getPPPDiscount(countryCode)
  const adjustedPrice = Math.round(originalPrice * (100 - discount) / 100)

  return {
    originalPrice,
    price: adjustedPrice,
    discount,
    countryCode: countryCode?.toUpperCase() || null
  }
}

/**
 * Get country name from code (common ones)
 */
const COUNTRY_NAMES = {
  'IN': 'India', 'BR': 'Brazil', 'MX': 'Mexico', 'AR': 'Argentina',
  'CO': 'Colombia', 'PL': 'Poland', 'TR': 'Turkey', 'ID': 'Indonesia',
  'PH': 'Philippines', 'VN': 'Vietnam', 'TH': 'Thailand', 'MY': 'Malaysia',
  'UA': 'Ukraine', 'RO': 'Romania', 'CZ': 'Czech Republic', 'HU': 'Hungary',
  'ZA': 'South Africa', 'EG': 'Egypt', 'NG': 'Nigeria', 'KE': 'Kenya',
  'PK': 'Pakistan', 'BD': 'Bangladesh', 'CL': 'Chile', 'PE': 'Peru',
  'CN': 'China', 'RU': 'Russia', 'KR': 'South Korea', 'TW': 'Taiwan',
  'JP': 'Japan', 'SG': 'Singapore', 'IL': 'Israel', 'AE': 'UAE',
  'SA': 'Saudi Arabia', 'ES': 'Spain', 'IT': 'Italy', 'PT': 'Portugal',
  'GR': 'Greece', 'RS': 'Serbia', 'BG': 'Bulgaria', 'HR': 'Croatia'
}

export function getCountryName(countryCode) {
  return COUNTRY_NAMES[countryCode?.toUpperCase()] || countryCode
}
