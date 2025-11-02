// src/components/AvailableSlots.jsx

// YENİ: 'useCallback' kancasını import ediyoruz
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const API_BASE_URL = 'https://bk-api-evsk.onrender.com';

function AvailableSlots({ refreshKey, onAppointmentBooked }) {
  const [slots, setSlots] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // YENİ: Hangi butonun yüklendiğini bilmek için (daha iyi UI)
  const [bookingId, setBookingId] = useState(null); 

  const { accessToken } = useAuth();

  // --- GÖREV 101 REFAKTÖRÜ (Adım 1) ---
  // 'fetchSlots' fonksiyonunu 'useEffect'in DIŞINA taşıdık
  // ve 'useCallback' ile sardık.
  const fetchSlots = useCallback(async () => {
    console.log("AvailableSlots: Slotlar çekiliyor...");
    setLoading(true);
    setError(null);

    if (!accessToken) {
      setLoading(false);
      setError("Giriş yapılmamış!");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/slots/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setSlots(response.data);
      console.log("AvailableSlots: Slotlar çekildi:", response.data);
    } catch (err) {
      console.error("AvailableSlots: Slot çekme hatası!", err);
      setError("Slotlar çekilirken bir hata oluştu.");
    } finally {
      setLoading(false); 
    }
  }, [accessToken]); // Bu fonksiyon 'accessToken'a bağlıdır


  // 'useEffect' (Adım 2)
  // Artık 'useEffect'in tek işi, ilk yüklemede 'fetchSlots'u çağırmak
  useEffect(() => {
    fetchSlots(); // Fonksiyonu çağır
  }, [fetchSlots, refreshKey]); // 'fetchSlots' (useCallback'den gelen) değişirse tekrar çalışır


  // --- YENİ FONKSİYON (Adım 3) ---
  // "Randevu Al" butonunun mantığı
  const handleBookAppointment = async (slotId) => {
    console.log(`Randevu alma isteği başladı. Slot ID: ${slotId}`);
    setBookingId(slotId); // Hangi butonun yüklendiğini hafızaya al
    setError(null);

    try {
      // GÖREV 33'teki (main.js) mantığın React hali
      const response = await axios.post(`${API_BASE_URL}/api/v1/appointments/`, 
        {
          "time_slot_id": slotId, // Tıklanan slotun ID'si
          "notes": "React V4.0 Test Randevusu" // Şimdilik notlar sabit
        },
        {
          headers: { 'Authorization': `Bearer ${accessToken}` } // HASTA'nın token'ı
        }
      );

      console.log("Randevu başarıyla alındı:", response.data);
      alert('Randevunuz başarıyla oluşturuldu!');

      if (onAppointmentBooked) {
          onAppointmentBooked(); // Sinyali yolla!
      }

      // 4. BAŞARI: Liste tazeleniyor!
      // Slot (is_booked=True) olduğu için listeden kaybolacak.
      //fetchSlots(); 

    } catch (err) {
      // Backend'den (Render) gelen hatayı (örn: 'Slot dolu') yakala
      const errorData = err.response ? err.response.data : "API ile iletişim kurulamadı";
      console.error("Randevu alınamadı:", errorData);
      alert(`Hata: Randevu alınamadı. (Sebep: ${JSON.stringify(errorData)})`);
      setError("Randevu alınamadı.");
    } finally {
      setBookingId(null); // Yüklenme durumunu (hangi buton olursa olsun) sıfırla
    }
  };

  // 5. Arayüz (UI) Mantığı (Aynı)
  if (loading) {
    return <p>Müsait slotlar yükleniyor...</p>;
  }
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // 6. JSX (HTML) Kısmı (GÜNCELLENDİ)
  return (
    <div>
      <h3>Müsait Slotlar</h3>
      {slots.length === 0 ? (
        <p>Gösterilecek müsait slot bulunamadı.</p>
      ) : (
        <ul>
          {slots.map(slot => (
            <li key={slot.id}> 
              {new Date(slot.start_time).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })}

              {/* GÜNCELLENDİ: 'onClick' olayı eklendi (Adım 5) */}
              <button 
                style={{ marginLeft: '10px' }}
                onClick={() => handleBookAppointment(slot.id)} // Tıklanınca yeni fonksiyonu çağır
                disabled={bookingId === slot.id} // Sadece tıklanan butonu kilitle
              >
                {/* YENİ: Sadece tıklanan butonun yazısı değişsin */}
                {bookingId === slot.id ? 'Alınıyor...' : 'Randevu Al'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AvailableSlots;