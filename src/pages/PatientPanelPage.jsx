// src/pages/PatientPanelPage.jsx
// Hasta Randevu Paneli - Sadece hasta (patient) kullanıcılar için

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AvailableSlots from '../components/AvailableSlots';
import MyPatientAppointments from '../components/MyPatientAppointments';

function PatientPanelPage() {
  const { currentUser, loading } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // İlk yükleme sırasında bekle
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

  // Güvenlik kontrolü
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Admin ise admin paneline yönlendir
  if (currentUser.is_staff) {
    return <Navigate to="/admin-panel" replace />;
  }

  return (
    <div className="space-y-6">
      {/* Hoşgeldin Bölümü */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Hoşgeldin, {currentUser.first_name || currentUser.email}!
        </h1>
        <p className="text-blue-100 text-lg">
          Randevu Paneline hoşgeldiniz. Müsait zamanlardan randevu alabilir ve mevcut randevularınızı görüntüleyebilirsiniz.
        </p>
      </div>

      {/* Müsait Slotlar Listesi */}
      <AvailableSlots 
        refreshKey={refreshKey} 
        onAppointmentBooked={triggerRefresh}
      />
      
      {/* Hastanın Kendi Randevuları */}
      <MyPatientAppointments 
        refreshKey={refreshKey} 
        onAppointmentCancelled={triggerRefresh}
      />
    </div>
  );
}

export default PatientPanelPage;

