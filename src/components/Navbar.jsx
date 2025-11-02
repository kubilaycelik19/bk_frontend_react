    // src/components/Navbar.jsx
    
    import React, { useState } from 'react';
    // YENİ: 'react-router-dom'dan 'Link' (bağlantı) aracını alıyoruz
    // Bu, '<a>' etiketinin React versiyonudur, sayfayı YENİLEMEZ.
    import { Link } from 'react-router-dom';
    
    // YENİ: Global Hafıza'dan (AuthContext) kullanıcıyı ve 'logout'u alıyoruz
    import { useAuth } from '../context/AuthContext';

    function Navbar() {
      // Global hafızadan 'currentUser' (admin mi hasta mı) ve 'logout'u çek
      const { currentUser, logout } = useAuth();
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

      return (
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Site Adı */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent hover:from-blue-300 hover:to-blue-200 transition-all duration-200">
                  <span className="hidden sm:inline">Dr. Başak Şeref Psikoloji</span>
                  <span className="sm:hidden">Dr. BŞ</span>
                </Link>
              </div>

              {/* Desktop Menü Linkleri */}
              <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                <Link 
                  to="/" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  Anasayfa
                </Link>
                <Link 
                  to="/about" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  Hakkımda
                </Link>

                {/* Randevu Al Butonu - Her zaman görünür */}
                {!currentUser && (
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Randevu Al
                  </Link>
                )}

                {/* --- Koşullu (Rol Bazlı) Linkler --- */}
                {currentUser ? (
                  // Eğer GİRİŞ YAPILMIŞSA:
                  <>
                    {currentUser.is_staff ? (
                      <Link 
                        to="/admin-panel" 
                        className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                      >
                        Yönetim Paneli
                      </Link>
                    ) : (
                      <Link 
                        to="/patient-panel" 
                        className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                      >
                        Randevu Panelim
                      </Link>
                    )}
                    <button 
                      onClick={logout} 
                      className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors duration-200"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  // Eğer GİRİŞ YAPILMAMIŞSA:
                  <Link 
                    to="/login" 
                    className="px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Giriş Yap
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Menü"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4 space-y-2">
                <Link 
                  to="/" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  Anasayfa
                </Link>
                <Link 
                  to="/about" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  Hakkımda
                </Link>

                {!currentUser && (
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-200"
                  >
                    Randevu Al
                  </Link>
                )}

                {currentUser ? (
                  <>
                    {currentUser.is_staff ? (
                      <Link 
                        to="/admin-panel" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                      >
                        Yönetim Paneli
                      </Link>
                    ) : (
                      <Link 
                        to="/patient-panel" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                      >
                        Randevu Panelim
                      </Link>
                    )}
                    <button 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition-colors duration-200"
                    >
                      Çıkış Yap
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                  >
                    Giriş Yap
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
      );
    }

    export default Navbar;