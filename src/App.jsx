// src/App.jsx (TEMİZ VE DOĞRU HALİ)

import React, {useState} from 'react';
// Global hafıza kutumuzu import ediyoruz
import { useAuth } from './context/AuthContext';

// Bileşenlerimizi import ediyoruz
import LoginForm from './components/LoginForm'; 
import AvailableSlots from './components/AvailableSlots'; // GÖREV 100'de yarattık
import CreateSlotForm from './components/CreateSlotForm';
import AllAppointmentsList from './components/AllAppointmentsList';
import MyPatientAppointments from './components/MyPatientAppointments';


function App() {
  
  // Global Hafıza'dan 'currentUser'ı dinliyoruz
  const { currentUser, logout } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0); 

  // 1. EĞER GİRİŞ YAPILMAMIŞSA...
  // (currentUser 'null' ise)
  if (!currentUser) {
    // SADECE LoginForm'u göster.
    return (
      <div className="App">
        <LoginForm />
      </div>
    );
  }

  // 2. EĞER GİRİŞ YAPILMIŞSA...
  // (currentUser 'null' değilse)
  return (
    <div className="App">
      <h1>Hoşgeldin, {currentUser.email}!</h1>

      {/* Kullanıcı rolüne göre (is_staff) farklı bileşenleri göster */}

      {currentUser.is_staff ? (
        // Eğer PSİKOLOG (Admin) ise:
        <div>
        <p>Psikolog Yönetim Paneli (Hoşgeldin, {currentUser.first_name})</p>

        {/* YENİ EKLEDİK: Slot yaratma formunu çağır */}
        {/* NOT: Psikolog da 'AvailableSlots' listesini görmeli,
            böylece ne eklediğini ve hangilerinin alındığını (kaybolduğunu)
            görebilir. Bu bir "tazeleme" mekanizmasıdır. */}

        <CreateSlotForm onSlotCreated={() => {
        // 'CreateSlotForm' "Slot yarattım!" dediği an,
        // 'refreshKey' state'ini değiştir (örn: 0'ı 1 yap, 1'i 2 yap).
        setRefreshKey(prevKey => prevKey + 1); 
    }} />

        <hr />

        {/* <AvailableSlots refreshKey={refreshKey} /> */}
        <AllAppointmentsList refreshKey={refreshKey} />

        {/* TODO: Buraya "Randevularım" (yani tüm randevular) listesi gelecek */}
      </div>
      ) : (
        // Eğer HASTA ise:
        <div>
          <p>Hasta Randevu Paneli (Hoşgeldin, {currentUser.first_name})</p>

          {/* Müsait slotları listeleyen bileşeni çağır */}
          <AvailableSlots 
            refreshKey={refreshKey} 
            onAppointmentBooked={() => {
              // Sinyal gelince "Tazeleme Butonu"na bas
              setRefreshKey(prevKey => prevKey + 1); 
            }}
          />

          {/* TODO: Buraya "Randevularım" listesi de gelecek */}
          <MyPatientAppointments refreshKey={refreshKey} />
        </div>
      )}

      {/* Çıkış Yap Butonu */}
      <button onClick={logout}>Çıkış Yap</button>
    </div>
  );
}

export default App;