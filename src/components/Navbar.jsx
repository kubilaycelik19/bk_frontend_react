    // src/components/Navbar.jsx
    
    import React from 'react';
    // YENİ: 'react-router-dom'dan 'Link' (bağlantı) aracını alıyoruz
    // Bu, '<a>' etiketinin React versiyonudur, sayfayı YENİLEMEZ.
    import { Link } from 'react-router-dom';
    
    // YENİ: Global Hafıza'dan (AuthContext) kullanıcıyı ve 'logout'u alıyoruz
    import { useAuth } from '../context/AuthContext';

    function Navbar() {
      // Global hafızadan 'currentUser' (admin mi hasta mı) ve 'logout'u çek
      const { currentUser, logout } = useAuth();

      return (
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Site Adı */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent hover:from-blue-300 hover:to-blue-200 transition-all duration-200">
                  Dr. Başak Şeref Psikoloji
                </Link>
              </div>

              {/* Menü Linkleri */}
              <div className="flex items-center space-x-2 sm:space-x-4">
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
            </div>
          </div>
        </nav>
      );
    }

    export default Navbar;