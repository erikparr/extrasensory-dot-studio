'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RequestDownloadPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success', 'error', 'not_found'
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    setMessage('')

    try {
      const response = await fetch('/api/request-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Download link sent to your email!')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to send download link')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Request Download Link</h1>
        <p className="text-lg text-studio-gray-600">
          Enter the email address you used for your purchase to receive a new download link.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-green-800">Email Sent!</h2>
          <p className="text-green-700 mb-6">{message}</p>
          <p className="text-sm text-green-600 mb-6">
            Check your inbox (and spam folder) for an email from Extrasensory Studio.
          </p>
          <button
            onClick={() => {
              setStatus(null)
              setEmail('')
            }}
            className="btn-secondary"
          >
            Request Another Link
          </button>
        </div>
      ) : (
        <div className="bg-studio-gray-100 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-studio-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-studio-blue focus:border-transparent"
              />
            </div>

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-studio-blue text-white py-3 rounded-lg font-medium hover:bg-studio-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Download Link'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-studio-gray-300">
            <h3 className="font-medium mb-3">What happens next?</h3>
            <ul className="text-sm text-studio-gray-600 space-y-2">
              <li>• We&apos;ll look up your purchases using this email address</li>
              <li>• If found, you&apos;ll receive an email with a download link</li>
              <li>• The download link will be valid for 30 days</li>
              <li>• Check your spam folder if you don&apos;t see the email</li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-studio-gray-300 text-center">
            <p className="text-sm text-studio-gray-600 mb-4">
              Still having trouble?
            </p>
            <a
              href="mailto:support@extrasensory.studio"
              className="text-studio-blue hover:underline text-sm"
            >
              Contact Support: support@extrasensory.studio
            </a>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <Link href="/" className="btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
