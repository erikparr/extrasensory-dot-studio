'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const email = searchParams.get('email')

    if (!email) {
      setStatus('error')
      setMessage('No email provided.')
      return
    }

    // Auto-unsubscribe on page load
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: decodeURIComponent(email), action: 'unsubscribe' })
    })
      .then(res => res.json())
      .then(data => {
        setStatus('success')
        setMessage(data.message || "You've been unsubscribed.")
      })
      .catch(() => {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      })
  }, [searchParams])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
          fontSize: '24px',
          fontWeight: '600',
          color: '#ffffff',
          marginBottom: '16px'
        }}>
          {status === 'loading' && 'Unsubscribing...'}
          {status === 'success' && 'Unsubscribed'}
          {status === 'error' && 'Error'}
        </h1>
        <p style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
          fontSize: '16px',
          color: '#888888',
          lineHeight: '1.5',
          marginBottom: '32px'
        }}>
          {message}
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '4px',
            color: '#888888',
            textDecoration: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
            fontSize: '14px'
          }}
        >
          Back to Extrasensory
        </a>
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: '#888888' }}>Loading...</p>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  )
}
