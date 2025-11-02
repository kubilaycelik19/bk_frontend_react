// src/pages/HomePage.jsx
// Sitemizin "Anasayfası" - Karşılama Sayfası

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <article className="space-y-8">
      {/* Hero Section - Büyük başlık ve açıklama */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8 md:p-12 rounded-2xl shadow-lg border border-blue-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Dr. Başak Şeref Psikoloji
            </span>
            <span className="block text-3xl md:text-4xl text-gray-700 mt-2">Hoşgeldiniz</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ruhsal denge ve iç huzur yolculuğunuzda size rehberlik etmek için buradayız. 
            Profesyonel ve etik ilkelerle, size özel bir terapi süreci sunuyoruz.
          </p>
        </div>

        {/* Call-to-Action Butonları - Modern tasarım */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {currentUser ? (
            <Link 
              to="/panel" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              Randevu Panelinize Gidin →
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              Randevu Almak İçin Giriş Yapın →
            </Link>
          )}
          
          <Link 
            to="/about" 
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            Hakkımda Bilgi Alın
          </Link>
        </div>
      </div>

      {/* Özellikler/Değerler Bölümü */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
          <div className="text-blue-600 text-3xl mb-3">💆</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Profesyonel Hizmet</h3>
          <p className="text-gray-600 text-sm">Uzman kadromuzla size en iyi hizmeti sunuyoruz</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
          <div className="text-blue-600 text-3xl mb-3">🤝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Güvenli Ortam</h3>
          <p className="text-gray-600 text-sm">Yargılayıcı olmayan, güvenli bir terapi ortamı</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
          <div className="text-blue-600 text-3xl mb-3">📅</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Kolay Randevu</h3>
          <p className="text-gray-600 text-sm">Online randevu sistemi ile kolayca randevu alın</p>
        </div>
      </div>
    </article>
  );
}

export default HomePage;