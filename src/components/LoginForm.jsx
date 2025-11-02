// src/components/LoginForm.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// YENİ EKLEDİK: Global hafıza kutumuza (AuthContext)
// erişmemizi sağlayan 'useAuth' kancamızı import ediyoruz
import { useAuth } from '../context/AuthContext.jsx';

function LoginForm() {
  // Formun kendi hafızası (state)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // YENİ EKLEDİK: Arayüz (UI) için yeni hafıza alanları
  // 1. API'ye istek atarken 'Giriş Yap' butonunu kapatmak için
  const [loading, setLoading] = useState(false); 
  // 2. API'den hata dönerse (örn: 401 Hatalı Şifre) kullanıcıya göstermek için
  const [error, setError] = useState(null);

  // YENİ EKLEDİK: 'useAuth()' kancasını çağırarak
  // AuthContext'in içine koyduğumuz 'login' fonksiyonunu çekiyoruz
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  // Giriş başarılı olduğunda role göre yönlendir
  // Sadece login sonrası yönlendirme için bir flag kullanıyoruz
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    // Sadece login başarılı olduktan sonra ve currentUser varsa yönlendir
    if (loginSuccess && currentUser) {
      if (currentUser.is_staff) {
        navigate('/admin-panel');
      } else {
        navigate('/patient-panel');
      }
      setLoginSuccess(false); // Flag'i sıfırla
    }
  }, [loginSuccess, currentUser, navigate]);

  // Form 'submit' (gönder) edildiğinde çalışacak fonksiyon
  const handleLogin = async (event) => {
    event.preventDefault(); // Sayfa yenilenmesini engelle

    console.log("LoginForm: 'handleLogin' tetiklendi.");

    // Hata varsa temizle ve yükleniyor moduna geç
    setError(null);
    setLoading(true);

    try {
      // --- YENİ MANTIK (GÖREV 99) ---
      // Artık API'yi (axios) burada çağırmıyoruz.
      // Sadece global hafızadaki 'login' fonksiyonunu çağırıyoruz.
      const success = await login(email, password); 

      if (!success) {
        // 'login' fonksiyonu (AuthContext'te) 'false' dönerse,
        // (örn: 401 hatası aldıysa) hafızaya hata mesajı yaz.
        setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
      } else {
        // Giriş başarılı - flag'i aktif et, useEffect yönlendirecek
        setLoginSuccess(true);
      }

    } catch (err) {
        // Beklenmedik bir hata (örn: API kapalı)
        setError('Bir hata oluştu. Sunucu çalışıyor mu?');
        console.error(err);
    }

    // Yükleniyor modunu kapat
    setLoading(false);
  };

  // Bu bileşenin ekranda göstereceği HTML (JSX)
  return (
    <div className="w-full">
      {/* Modern başlık tasarımı */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
          Giriş Yap
        </h1>
        <p className="text-gray-600 text-sm">Hesabınıza giriş yaparak randevu alabilirsiniz</p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            E-posta Adresi
          </label>
          <input 
            id="email"
            type="email"
            required
            value={email}
            placeholder="ornek@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Şifre
          </label>
          <input 
            id="password"
            type="password"
            required
            value={password}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        
        {/* Hata mesajı - Modern alert tasarımı */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Giriş yapılıyor...
            </span>
          ) : (
            'Giriş Yap'
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;