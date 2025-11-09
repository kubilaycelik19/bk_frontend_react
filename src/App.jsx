// src/App.jsx
// Ana routing yapısı - Public site yapısı

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout component'i (Navbar + Footer içerir)
import Layout from './components/Layout';

// Sayfalar
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPanelPage from './pages/AdminPanelPage';
import PatientPanelPage from './pages/PatientPanelPage';

// Protected Route component'leri
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Routes>
      {/* Layout tüm sayfalarda gösterilecek (Navbar + Footer) */}
      <Route path="/" element={<Layout />}>
        {/* Public Sayfalar */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Admin Panel - Sadece admin kullanıcılar erişebilir */}
        <Route 
          path="admin-panel" 
          element={
            <AdminRoute>
              <AdminPanelPage />
            </AdminRoute>
          } 
        />
        
        {/* Hasta Panel - Sadece hasta kullanıcılar erişebilir */}
        <Route 
          path="patient-panel" 
          element={
            <ProtectedRoute>
              <PatientPanelPage />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;