'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  var pathname = usePathname()
  var [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  var navItems = [
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' }
  ]

  return (
    <header
      className="fixed top-0 w-full z-50 border-b"
      style={{
        backgroundColor: 'var(--color-bg-base)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <div className="max-w-9xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-6">
            <img
              src="/logo.svg"
              alt="extrasensory logo"
              className="w-8 h-8 md:w-[54px] md:h-[54px]"
              style={{ filter: 'drop-shadow(0 0 8px rgba(223, 255, 128, 0.6))' }}
            />
            <div style={{ marginLeft: 'clamp(0px, 2vw, 40px)' }}>
              <span
                className="leading-none mallanna-text"
                style={{
                  fontSize: 'clamp(1.2rem, 4vw, 3.2rem)',
                  fontWeight: '300',
                  letterSpacing: '0.01em',
                  fontDisplay: 'swap',
                  transform: 'scaleX(1.1)',
                  display: 'block',
                  color: '#dfff80'
                }}
              >
                extrasensory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link ${pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              style={{ color: 'var(--color-text-primary)' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 border-t"
            style={{ borderColor: 'var(--color-border-subtle)' }}
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-link ${pathname === item.path ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
