// src/components/Footer.jsx
// Anasayfa, Hakkımda vb. ile uyumlu alt bilgi

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 text-gray-700 mt-auto shadow-lg border-t border-gray-200/50 relative overflow-hidden">
      {/* Dekoratif arka plan elementleri - Çok subtle */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-100/20 rounded-full -mr-24 -mt-24 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-100/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6">
          
          {/* Sol: Logo ve Slogan */}
          <div className="text-center md:text-left">
            <Link to="/" className="inline-block mb-2 group">
              <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 justify-center md:justify-start text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
                <img 
                  src="/images/basak.png" 
                  alt="Başak Logo" 
                  className="w-13 h-12 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/0"
                />
                <span>Başak Şeref</span>
              </h3>
            </Link>
            <p className="text-gray-600 text-xs md:text-sm">
              Birlikte yürüyelim mi? 💚
            </p>
          </div>

          {/* Orta: Hızlı Linkler */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-sm mb-3 text-gray-800">Hızlı Linkler</h4>
            <nav className="flex flex-col space-y-1.5">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-xs md:text-sm hover:translate-x-1 transform inline-block w-fit md:w-auto"
              >
                → Anasayfa
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-xs md:text-sm hover:translate-x-1 transform inline-block w-fit md:w-auto"
              >
                → Hakkımda
              </Link>
            </nav>
          </div>

          {/* Sağ: İletişim */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold text-sm mb-3 text-gray-800">İletişim</h4>
            <p className="text-gray-600 text-xs md:text-sm mb-1">
              Randevu için
            </p>
            <p className="text-gray-600 text-xs md:text-sm">
              WhatsApp'tan ulaşın
            </p>
          </div>

        </div>
        
        {/* Alt Çizgi */}
        <div className="border-t border-gray-200/50 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Başak Şeref. Tüm hakları saklıdır.
            </p>
            <p className="text-gray-400 text-xs text-center md:text-right">
              Her adımda yanınızdayım 🌟
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
