// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';
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

  // 7. ÇIKIŞ YAP FONKSİYONU
  const logout = () => {
    setAccessToken(null);
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    if (typeof window !== 'undefined') {
      window.__authToken__ = null;
    }
    console.log("AuthContext: Çıkış yapıldı.");
  };

  // 8. Bu "hafıza kutusunun" tüm alt bileşenlere (children)
  //    hangi bilgileri ve fonksiyonları sağlayacağını belirle
  const value = {
    accessToken,
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}