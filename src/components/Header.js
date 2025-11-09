'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Shop', path: '/shop' }
  ]
  
  return (
    <header className="fixed top-0 w-full bg-studio-white border-b border-studio-gray-200 z-50">
      <div className="max-w-9xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-6">
            <img
              src="/logo.svg"
              alt="extrasensory logo"
              className="w-12 h-12 md:w-20 md:h-20"
              style={{ filter: 'drop-shadow(0 0 8px rgba(204, 255, 0, 0.6))' }}
            />
            <span
              className="font-semibold text-studio-accent leading-none mallanna-text"
              style={{
                fontSize: 'clamp(1.5rem, 5vw, 4rem)',
                letterSpacing: '0.01em',
                fontDisplay: 'swap',
                transform: 'scaleX(1.1)',
                marginLeft: 'clamp(0px, 2vw, 40px)'
              }}
            >
              extrasensory
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link ${pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-studio-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-studio-gray-200">
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