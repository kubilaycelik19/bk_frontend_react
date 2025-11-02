// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// 'index.css'i sildiğimiz için bu import'u da silebilir veya bırakabiliriz
// import './index.css' 

// YENİ EKLEDİK: Global Hafıza Sağlayıcımızı import ediyoruz
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* YENİ EKLEDİK: Tüm <App />'i <AuthProvider> ile sarıyoruz */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)