// src/components/Footer.jsx
// Anasayfa, Hakkımda vb. ile uyumlu alt bilgi

import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-auto shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Sol Taraf: Logo/Slogan */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">
              <Link to="/" className="hover:text-blue-300 transition-colors duration-200">
                Dr. Başak Şeref Psikoloji
              </Link>
            </h3>
            <p className="text-sm text-gray-400">Ruhsal Dengeniz İçin Yanınızdayız.</p>
          </div>

          {/* Sağ Taraf: Hızlı Linkler */}
          <div className="flex flex-wrap justify-center md:justify-end space-x-6">
            <Link 
              to="/" 
              className="text-sm hover:text-blue-300 transition-colors duration-200"
            >
              Anasayfa
            </Link>
            <Link 
              to="/about" 
              className="text-sm hover:text-blue-300 transition-colors duration-200"
            >
              Hakkımda
            </Link>
            
            {/* Gelecekte eklenebilir:
            <Link to="/hizmetler" className="text-sm hover:text-blue-300 transition-colors duration-200">
              Hizmetler
            </Link>
            <Link to="/iletisim" className="text-sm hover:text-blue-300 transition-colors duration-200">
              İletişim
            </Link>
            */}
          </div>

        </div>
        
        {/* Alt Çizgi */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Dr. Başak Şeref Psikoloji. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
