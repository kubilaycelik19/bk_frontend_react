// src/components/ProtectedRoute.jsx
// Giriş yapılmış kullanıcılar için korumalı route component'i

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // İlk yükleme sırasında bekle (kullanıcı bilgisi yükleniyor olabilir)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Eğer giriş yapılmamışsa, login sayfasına yönlendir
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Giriş yapılmışsa, içeriği göster
  return children;
}

export default ProtectedRoute;

