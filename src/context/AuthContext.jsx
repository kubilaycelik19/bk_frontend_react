// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// 1. API'mizin ana adresini buraya alıyoruz (daha merkezi)
const API_BASE_URL = 'https://bk-api-evsk.onrender.com';

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
      // --- GÖREV 97'deki kodun aynısı ---
      const response = await axios.post(`${API_BASE_URL}/api/token/`, {
        email,
        password
      });

      setAccessToken(response.data.access); // Token'ı global hafızaya kaydet
      console.log("AuthContext: Token alındı.");

      // --- GÖREV 29'daki kodun (users/me) aynısı ---
      // Token'ı kullanarak hemen "Ben Kimim?" diye sor
      const userResponse = await axios.get(`${API_BASE_URL}/api/v1/users/me/`, {
        headers: { 'Authorization': `Bearer ${response.data.access}` }
      });

      setCurrentUser(userResponse.data); // Kullanıcıyı global hafızaya kaydet
      console.log("AuthContext: Kullanıcı rolü alındı:", userResponse.data);

      return true; // Başarılı

    } catch (error) {
      console.error("AuthContext: Giriş hatası!", error.response.data);
      // Hata durumunda hafızayı temizle
      setAccessToken(null);
      setCurrentUser(null);
      return false; // Başarısız
    }
  };

  // 7. ÇIKIŞ YAP FONKSİYONU
  const logout = () => {
    setAccessToken(null);
    setCurrentUser(null);
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