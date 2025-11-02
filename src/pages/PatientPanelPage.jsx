// src/pages/PatientPanelPage.jsx
// Hasta Randevu Paneli - Sadece hasta (patient) kullanıcılar için

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AvailableSlots from '../components/AvailableSlots';
import MyPatientAppointments from '../components/MyPatientAppointments';

function PatientPanelPage() {
  const { currentUser } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

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
      <MyPatientAppointments refreshKey={refreshKey} />
    </div>
  );
}

export default PatientPanelPage;

