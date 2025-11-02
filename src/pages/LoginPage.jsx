// src/pages/LoginPage.jsx
// Sadece "Giriş Formu"nu (LoginForm) ortalayan bir "sayfa"

import React from 'react';
import LoginForm from '../components/LoginForm'; // GÖREV 96'da yarattığımız bileşen

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <div className="max-w-md w-full">
        {/* Modern kart tasarımı - gölge ve gradient border efekti */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
          <LoginForm />
        </div>
        
        {/* Gelecekte eklenebilir: Kayıt ol linki */}
        {/* 
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Hesabınız yok mu?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
              Kayıt Olun
            </Link>
          </p>
        </div>
        */}
      </div>
    </div>
  );
}

export default LoginPage;
