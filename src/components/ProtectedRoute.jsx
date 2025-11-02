// src/components/ProtectedRoute.jsx
// Giriş yapılmış kullanıcılar için korumalı route component'i

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  // Eğer giriş yapılmamışsa, login sayfasına yönlendir
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Giriş yapılmışsa, içeriği göster
  return children;
}

export default ProtectedRoute;

