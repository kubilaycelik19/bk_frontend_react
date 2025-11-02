// src/components/AdminRoute.jsx
// Sadece admin (is_staff) kullanıcılar için korumalı route

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  // Giriş yapılmamışsa login'e yönlendir
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Admin değilse hasta panel sayfasına yönlendir
  if (!currentUser.is_staff) {
    return <Navigate to="/patient-panel" replace />;
  }

  // Admin ise içeriği göster
  return children;
}

export default AdminRoute;

