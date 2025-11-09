// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient, { API_BASE_URL } from '../utils/apiClient.js';

// 2. Global "Hafıza Kutusu"nu (Context) yarat
const AuthContext = createContext();

// 3. Başka bileşenlerin bu kutuya kolayca erişmesini sağlayan
//    kısa bir "kanca" (custom hook) yaratıyoruz
export function useAuth() {
  return useContext(AuthContext);
}

// 4. Bu kutunun "Sağlayıcısı" (Provider)
//    Bu, tüm uygulamamızı saracak olan BEYİN'dir.
export function AuthProvider({ children }) {

  // 5. Global Hafızayı (State) burada tutuyoruz
  const [accessToken, setAccessToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // İlk yükleme durumu

  // 5.5. SAYFA YÜKLENDİĞİNDE TOKEN VARSA KULLANICI BİLGİSİNİ YÜKLE
  useEffect(() => {
    const initializeAuth = async () => {
      // localStorage'dan token'ı al
      const storedToken = localStorage.getItem('accessToken');
      
      if (storedToken) {
        try {
          // Token'ı state'e kaydet (interceptor için)
          setAccessToken(storedToken);
          if (typeof window !== 'undefined') {
            window.__authToken__ = storedToken;
          }

          // Kullanıcı bilgilerini al
          const userResponse = await apiClient.get('/api/v1/users/me/');
          setCurrentUser(userResponse.data);
          console.log("AuthContext: Sayfa yenilendi, kullanıcı bilgisi yüklendi:", userResponse.data);
        } catch (error) {
          // Token geçersiz veya süresi dolmuşsa temizle
          console.error("AuthContext: Token geçersiz veya süresi dolmuş:", error);
          localStorage.removeItem('accessToken');
          setAccessToken(null);
          setCurrentUser(null);
          if (typeof window !== 'undefined') {
            window.__authToken__ = null;
          }
        }
      }
      
      // İlk yükleme tamamlandı
      setLoading(false);
    };

    initializeAuth();
  }, []); // Sadece component mount olduğunda çalış

  // 6. GİRİŞ YAP FONKSİYONU
  // LoginForm artık API'yi bilmeyecek. Sadece bu fonksiyonu çağıracak.
  const login = async (email, password) => {
    try {
      // Token alma
      const response = await apiClient.post('/api/token/', {
        email,
        password
      });

      const accessToken = response.data.access;
      setAccessToken(accessToken); // Token'ı global hafızaya kaydet
      
      // Token'ı localStorage'a da kaydet (interceptor için)
      localStorage.setItem('accessToken', accessToken);
      if (typeof window !== 'undefined') {
        window.__authToken__ = accessToken;
      }
      
      console.log("AuthContext: Token alındı.");

      // Kullanıcı bilgilerini al
      const userResponse = await apiClient.get('/api/v1/users/me/');

      setCurrentUser(userResponse.data); // Kullanıcıyı global hafızaya kaydet
      console.log("AuthContext: Kullanıcı rolü alındı:", userResponse.data);

      return true; // Başarılı

    } catch (error) {
      console.error("AuthContext: Giriş hatası!", error);
      // Hata durumunda hafızayı temizle
      setAccessToken(null);
      setCurrentUser(null);
      localStorage.removeItem('accessToken');
      if (typeof window !== 'undefined') {
        window.__authToken__ = null;
      }
      
      // Hata mesajını döndür (LoginForm'da kullanılabilir)
      return { 
        success: false, 
        error: error.error || {
          code: 'LOGIN_ERROR',
          message: 'Giriş yapılamadı. E-posta veya şifrenizi kontrol edin.'
        }
      };
    }
  };

  // 7. KAYIT OL FONKSİYONU
  const register = async (email, password, firstName, lastName) => {
    try {
      // Kullanıcı kaydı oluştur
      // Backend email'den otomatik username oluşturur
      const response = await apiClient.post('/api/v1/users/', {
        email,
        password,
        first_name: firstName,
        last_name: lastName
      });

      console.log("AuthContext: Kayıt başarılı.", response.data);
      return true; // Başarılı

    } catch (error) {
      console.error("AuthContext: Kayıt hatası!", error);
      
      // Hata mesajını döndür (RegisterForm'da kullanılabilir)
      return { 
        success: false, 
        error: error.error || {
          code: 'REGISTER_ERROR',
          message: 'Kayıt olunamadı. Lütfen bilgilerinizi kontrol edin.'
        }
      };
    }
  };

  // 8. ÇIKIŞ YAP FONKSİYONU
  const logout = () => {
    setAccessToken(null);
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    if (typeof window !== 'undefined') {
      window.__authToken__ = null;
    }
    console.log("AuthContext: Çıkış yapıldı.");
  };

  // 9. Bu "hafıza kutusunun" tüm alt bileşenlere (children)
  //    hangi bilgileri ve fonksiyonları sağlayacağını belirle
  const value = {
    accessToken,
    currentUser,
    login,
    register,
    logout,
    loading // İlk yükleme durumunu da export et
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}