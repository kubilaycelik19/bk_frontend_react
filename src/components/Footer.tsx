import React from 'react'
import { Link } from 'react-router-dom'
import basakLogo from '../images/basak.png'

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 text-gray-700 mt-auto shadow-lg border-t border-gray-200/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/20 rounded-full -mr-24 -mt-24 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-100/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col items-center mb-6">
          <Link to="/" className="inline-block mb-2 group">
            <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 justify-center text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
              <img
                src={basakLogo}
                alt="Psikolog Basak Seref logosu"
                className="w-13 h-12 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/0"
              />
              <span>Başak Şeref</span>
            </h3>
          </Link>
          <p className="text-gray-600 text-xs md:text-sm text-center">Her adımda yanınızdayım</p>
        </div>

        <div className="border-t border-gray-200/50 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Başak Şeref. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

