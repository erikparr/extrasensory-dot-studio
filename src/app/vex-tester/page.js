'use client'
import { useState } from 'react'
import { getProduct } from '@/lib/products'
import { validateCoupon, calculateDiscountedPrice } from '@/lib/coupons'

export default function VexTesterPage() {
  const product = getProduct('midi-warp')
  const [couponCode, setCouponCode] = useState('GODMODE')
  const [appliedCoupon, setAppliedCoupon] = useState(validateCoupon('GODMODE'))
  const [couponError, setCouponError] = useState('')

  const handleApplyCoupon = () => {
    if (!couponCode) return

    const coupon = validateCoupon(couponCode)
    if (coupon) {
      setAppliedCoupon(coupon)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
      setAppliedCoupon(null)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const finalPrice = calculateDiscountedPrice(product.price, appliedCoupon)
  const isFree = finalPrice === 0

  const handlePurchase = async () => {
    try {
      if (isFree) {
        const fakeSessionId = 'free_' + Date.now()
        window.location.href = `/success?session_id=${fakeSessionId}&product_id=${product.id}&coupon=${appliedCoupon?.code || ''}&free=true`
        return
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          couponCode: appliedCoupon?.code,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen" style={{
      backgroundColor: '#000000',
      '--bg-primary': '#000000',
      '--bg-secondary': '#0a0a0a',
      '--bg-tertiary': '#1a1a1a',
      '--border-color': '#2a2a2a',
      '--text-primary': '#ffffff',
      '--text-secondary': '#aaaaaa',
      '--text-tertiary': '#666666'
    }}>
      <div className="max-w-2xl mx-auto px-6 py-32">
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          color: '#ccff33',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          VEX Tester Access
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#999999',
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          This page is for authorized testers. Use the coupon code below to download VEX for free.
        </p>

        <div style={{
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '8px',
          padding: '32px',
          marginTop: '32px'
        }}>
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            {appliedCoupon && finalPrice !== product.price && (
              <div style={{ fontSize: '18px', color: '#999999', textDecoration: 'line-through', marginBottom: '8px' }}>
                ${Math.floor(product.price / 100)}
              </div>
            )}
            <div style={{ fontSize: '48px', fontWeight: '700', color: '#ccff33' }}>
              {isFree ? 'FREE' : `$${Math.floor(finalPrice / 100)}`}
            </div>
            <div style={{ fontSize: '14px', color: '#666666', marginTop: '8px' }}>
              macOS • Windows • Linux
            </div>
          </div>

          {/* Coupon Code Section */}
          <div style={{ marginBottom: '24px' }}>
            {!appliedCoupon ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#ffffff',
                    backgroundColor: '#0a0a0a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '4px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleApplyCoupon}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px',
                    backgroundColor: '#2a2a2a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Apply
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(204, 255, 0, 0.1)',
                border: '1px solid #ccff33',
                borderRadius: '4px',
                padding: '12px 16px'
              }}>
                <span style={{ fontSize: '14px', color: '#ccff33' }}>
                  {appliedCoupon.code} - {appliedCoupon.description}
                </span>
                <button
                  onClick={handleRemoveCoupon}
                  style={{
                    fontSize: '14px',
                    color: '#ccff33',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            )}
            {couponError && (
              <p style={{ fontSize: '14px', color: '#ff4444', marginTop: '8px' }}>{couponError}</p>
            )}
          </div>

          <button
            onClick={handlePurchase}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#000000',
              backgroundColor: '#ccff33',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#b8e600'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ccff33'}
          >
            {isFree ? 'Download Free' : 'Purchase VEX'}
          </button>
        </div>

        <div style={{
          marginTop: '32px',
          padding: '24px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: '8px'
        }}>
          <h3 style={{ fontSize: '18px', color: '#ccff33', marginBottom: '12px' }}>
            Available Coupon Codes
          </h3>
          <ul style={{ fontSize: '14px', color: '#999999', lineHeight: '1.8' }}>
            <li>GODMODE - 100% off (free download)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
