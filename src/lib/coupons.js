export const COUPONS = {
  'GODMODE': {
    code: 'GODMODE', 
    discount: 100, // 100% off
    type: 'percent',
    description: 'welcome to valhalla',
    active: true
  }
}

export const validateCoupon = (code) => {
  const coupon = COUPONS[code?.toUpperCase()]
  return coupon && coupon.active ? coupon : null
}

export const calculateDiscountedPrice = (originalPrice, coupon) => {
  if (!coupon) return originalPrice
  
  if (coupon.type === 'percent') {
    return Math.round(originalPrice * (100 - coupon.discount) / 100)
  }
  
  if (coupon.type === 'fixed') {
    return Math.max(0, originalPrice - coupon.discount)
  }
  
  return originalPrice
}