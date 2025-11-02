// src/components/LoginForm.jsx

import React, { useState } from 'react';
// YENİ EKLEDİK: Global hafıza kutumuza (AuthContext)
// erişmemizi sağlayan 'useAuth' kancamızı import ediyoruz
import { useAuth } from '../context/AuthContext';

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
  const { login } = useAuth();

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
      }
      // Eğer 'success' true ise, BİR ŞEY YAPMAMIZA GEREK YOK.
      // Çünkü 'AuthContext' zaten 'currentUser'ı güncelledi.
      // Bir sonraki görevde (GÖREV 100), App.jsx bu değişikliği görecek.

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
    <div>
      <h1>Giriş Yap</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>E-posta:</label>
          <input 
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} // YENİ: Yüklenirken formu kilitle
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input 
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading} // YENİ: Yüklenirken formu kilitle
          />
        </div>

        {/* YENİ: Hata mesajı alanı */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {/* YENİ: Yüklenirken buton yazısını değiştir */}
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;