// src/pages/PanelPage.jsx
// Kullanıcı paneline giriş yaptıktan sonra görünen ana panel sayfası

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

// Tüm bileşenlerimizi import ediyoruz
import AvailableSlots from '../components/AvailableSlots';
import CreateSlotForm from '../components/CreateSlotForm';
import AllAppointmentsList from '../components/AllAppointmentsList';
import MyPatientAppointments from '../components/MyPatientAppointments';

function PanelPage() {
  // Global Hafıza'dan 'currentUser'ı dinliyoruz
  const { currentUser } = useAuth(); 
  
  // "Tazeleme Butonu" (Sinyal) state'imiz
  const [refreshKey, setRefreshKey] = useState(0); 

  // Kardeş bileşenleri (SlotListesi, RandevuListesi) tazeleyen
  // ana sinyal fonksiyonumuz
  const triggerRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Giriş yapılmamışsa (güvenlik kontrolü)
  if (!currentUser) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <p className="text-red-700 font-semibold">Lütfen önce giriş yapın.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hoşgeldin Bölümü - Modern kart */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 md:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Hoşgeldin, {currentUser.first_name || currentUser.email}!
        </h1>
        <p className="text-blue-100 text-lg">
          {currentUser.is_staff 
            ? "Psikolog Yönetim Paneline hoşgeldiniz" 
            : "Randevu Paneline hoşgeldiniz"}
        </p>
      </div>

      {/* Kullanıcı rolüne göre (is_staff) farklı panelleri göster */}
      {currentUser.is_staff ? (
        // --- PSİKOLOG (ADMIN) PANELİ ---
        <div className="space-y-6">
          {/* Slot Yaratma Formu */}
          <CreateSlotForm onSlotCreated={triggerRefresh} />
          
          {/* Müsait Slotlar Listesi */}
          <AvailableSlots 
            refreshKey={refreshKey} 
            onAppointmentBooked={triggerRefresh}
          />
          
          {/* Tüm Alınmış Randevular Listesi */}
          <AllAppointmentsList refreshKey={refreshKey} />
        </div>
      ) : (
        // --- HASTA (PATIENT) PANELİ ---
        <div className="space-y-6">
          {/* Müsait Slotlar Listesi */}
          <AvailableSlots 
            refreshKey={refreshKey} 
            onAppointmentBooked={triggerRefresh}
          />
          
          {/* Hastanın Kendi Randevuları */}
          <MyPatientAppointments refreshKey={refreshKey} />
        </div>
      )}
    </div>
  );
}

export default PanelPage;

