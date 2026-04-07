import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getWhatsAppBookingUrl } from '../utils/whatsapp'
import basakLogo from '../images/basak.png'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const waUrl = getWhatsAppBookingUrl()

  const appointmentClassMobile =
    'block px-3 py-2 rounded-full text-base font-semibold bg-white text-slate-700 hover:bg-slate-100 transition-all duration-200 text-center'

  return (
    <nav className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-slate-200 transition-colors duration-200 flex items-center gap-2"
            >
              <img
                src={basakLogo}
                alt="Psikolog Basak Seref logosu"
                className="w-13 h-12 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/0"
              />
              <span className="hidden sm:inline">Başak Şeref</span>
              <span className="sm:hidden">Başak</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors duration-200"
            >
              Anasayfa
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors duration-200"
            >
              Hakkımda
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-label="Menü"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-white/20 transition-colors duration-200"
            >
              Anasayfa
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-white/20 transition-colors duration-200"
            >
              Hakkımda
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

