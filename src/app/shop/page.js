'use client'

import { useState } from 'react'
import { getAllProducts } from '@/lib/products'
import { validateCoupon, calculateDiscountedPrice } from '@/lib/coupons'

const products = getAllProducts()


function ProductCard({ product }) {
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
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
        // For free downloads, go directly to success page
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
    <div className="project-card group">
      <div className="aspect-[3/4] bg-studio-gray-200 mb-4 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="w-full h-full bg-gradient-to-br from-studio-gray-300 to-studio-gray-400 flex items-center justify-center" style={{display: 'none'}}>
          <span className="text-studio-gray-600 text-sm">Image</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm text-studio-gray-600 px-2 py-1 bg-studio-gray-200 rounded-full">
            {product.category}
          </span>
          <div className="text-right">
            {appliedCoupon && finalPrice !== product.price && (
              <div className="text-sm text-studio-gray-500 line-through">
                ${(product.price / 100).toFixed(2)}
              </div>
            )}
            <span className="font-semibold">
              {isFree ? 'FREE' : `$${(finalPrice / 100).toFixed(2)}`}
            </span>
          </div>
        </div>
        
        <h3 className="font-medium text-lg mb-2 group-hover:underline">
          {product.title}
        </h3>
        
        <p className="text-sm text-studio-gray-600 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Coupon Code Section */}
        <div className="mb-4">
          {!appliedCoupon ? (
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 min-w-0 px-2 py-1.5 text-xs text-black border border-studio-gray-300 rounded focus:outline-none focus:border-studio-blue"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-2 py-1.5 text-xs bg-studio-gray-200 hover:bg-studio-gray-300 rounded whitespace-nowrap flex-shrink-0"
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded px-3 py-2">
              <span className="text-sm text-green-700">
                {appliedCoupon.code} - {appliedCoupon.description}
              </span>
              <button
                onClick={handleRemoveCoupon}
                className="text-sm text-green-600 hover:text-green-800"
              >
                Remove
              </button>
            </div>
          )}
          {couponError && (
            <p className="text-sm text-red-600 mt-1">{couponError}</p>
          )}
        </div>
        
        <button 
          className="w-full btn-primary"
          onClick={handlePurchase}
        >
          {isFree ? 'Download Free' : 'Buy Now'}
        </button>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const product = products[0] // VEX is the only product

  return (
    <div className="max-w-9xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">VEX Expressive MIDI</h1>
        <p className="text-lg text-studio-gray-600 max-w-2xl mx-auto">
          Professional MIDI effect plugin for macOS, Windows & Linux
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        {product && <ProductCard product={product} />}
      </div>
      
      <div className="mt-16 pt-12 border-t border-studio-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-4">Custom Projects</h3>
          <p className="text-studio-gray-600 mb-6 max-w-2xl mx-auto">
            Looking for something specific? I create custom tools, installations, 
            and digital experiences tailored to your needs.
          </p>
          <button className="btn-secondary">Discuss a Project</button>
        </div>
      </div>
    </div>
  )
}