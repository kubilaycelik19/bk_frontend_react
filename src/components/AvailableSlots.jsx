    // src/components/AvailableSlots.jsx (NİHAİ DOĞRU HALİ)

    import React, { useState, useEffect, useCallback } from 'react';
    import axios from 'axios';
    import { useAuth } from '../context/AuthContext.jsx'; 

    const API_BASE_URL = 'https://bk-api-evsk.onrender.com';

    // 'refreshKey' (sinyal) ve 'onAppointmentBooked' (sinyal gönderici)
    // prop'larını Ebeveyn'den (App.jsx) alıyoruz
    function AvailableSlots({ refreshKey, onAppointmentBooked }) {
      
      const [slots, setSlots] = useState([]); 
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [bookingId, setBookingId] = useState(null); 

      // --- HATA DÜZELTMESİ (BU SATIR EKSİKTİ): ---
      // Sadece 'accessToken'ı değil, 'currentUser'ı da
      // Global Hafıza'dan (useAuth) alıyoruz.
      const { accessToken, currentUser } = useAuth();
      
      // API'den müsait slotları çeken fonksiyon
      const fetchSlots = useCallback(async () => {
        
        // --- İŞTE İLK LOGLAMA BURADA ---
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
          
          // --- İŞTE İKİNCİ LOGLAMA BURADA ---
          console.log("AvailableSlots: Slotlar çekildi:", response.data);
          
        } catch (err) {
          console.error("AvailableSlots: Slot çekme hatası!", err);
          setError("Slotlar çekilirken bir hata oluştu.");
        } finally {
          setLoading(false); 
        }
      }, [accessToken]); // Bu 'accessToken'a bağlıdır

      
      // 'useEffect', hem ilk yüklemede hem de 'refreshKey' (sinyal) değiştiğinde
      // 'fetchSlots'u tetikler.
      useEffect(() => {
        fetchSlots(); 
      }, [fetchSlots, refreshKey]); 

      
      // "Randevu Al" (Hasta) butonunun mantığı
      const handleBookAppointment = async (slotId) => {
        console.log(`Randevu alma isteği başladı. Slot ID: ${slotId}`);
        setBookingId(slotId); 
        setError(null);

        try {
          await axios.post(`${API_BASE_URL}/api/v1/appointments/`, 
            { "time_slot_id": slotId, "notes": "React V4.0 Test Randevusu" },
            { headers: { 'Authorization': `Bearer ${accessToken}` } }
          );
          
          console.log("Randevu başarıyla alındı:", slotId);
          alert('Randevunuz başarıyla oluşturuldu!');

          // BAŞARI: Ebeveyn'e (App.jsx) haber ver
          if (onAppointmentBooked) {
              onAppointmentBooked(); // Sinyali yolla!
          }

        } catch (err) {
          const errorData = err.response ? err.response.data : "API ile iletişim kurulamadı";
          console.error("Randevu alınamadı:", errorData);
          alert(`Hata: Randevu alınamadı. (Sebep: ${JSON.stringify(errorData)})`);
          setError("Randevu alınamadı.");
        } finally {
          setBookingId(null); 
        }
      };

      // "Slot Sil" (Psikolog/Admin) butonunun mantığı
      const handleDeleteSlot = async (slotId) => {
        console.log(`Slot silme isteği başladı. Slot ID: ${slotId}`);
        setBookingId(slotId); 
        setError(null);

        if (!window.confirm(`ID: ${slotId} olan slotu silmek istediğinizden emin misiniz?`)) {
          setBookingId(null);
          return; 
        }

        try {
          await axios.delete(`${API_BASE_URL}/api/v1/slots/${slotId}/`, {
            headers: { 'Authorization': `Bearer ${accessToken}` } 
          });
          
          console.log("Slot başarıyla silindi. ID:", slotId);
          alert('Müsait zaman slotu başarıyla silindi.');
          
          // BAŞARI: Listeyi direkt tazele
          fetchSlots(); 

        } catch (err) {
          const errorData = err.response ? err.response.data : "API ile iletişim kurulamadı";
          console.error("Slot silinemedi:", errorData);
          alert(`Hata: Slot silinemedi. (Sebep: ${JSON.stringify(errorData)})`);
          setError("Slot silinemedi.");
        } finally {
          setBookingId(null); 
        }
      };

      // 5. Arayüz (UI) Mantığı
      if (loading) {
        return (
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-3 text-gray-600 font-medium">Müsait slotlar yükleniyor...</span>
            </div>
          </div>
        );
      }
      
      if (error) {
        return (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-red-200">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        );
      }

      // 6. JSX (HTML) Kısmı - Modern tasarım
      return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Müsait Slotlar</h3>
            <p className="text-gray-600 text-sm">{slots.length} müsait zaman slotu bulundu</p>
          </div>
          
          {slots.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-gray-400 text-4xl mb-3">📅</div>
              <p className="text-gray-600 font-medium">Gösterilecek müsait slot bulunamadı.</p>
              <p className="text-gray-500 text-sm mt-2">Yeni slotlar eklendiğinde burada görünecek.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {slots.map(slot => (
                <div 
                  key={slot.id} 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-blue-50 to-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                > 
                  <div className="mb-3 sm:mb-0">
                    <div className="flex items-center">
                      <span className="text-blue-600 text-xl mr-2">📅</span>
                      <span className="font-semibold text-gray-800 text-lg">
                        {new Date(slot.start_time).toLocaleString('tr-TR', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Rol bazlı butonlar */}
                  {currentUser && currentUser.is_staff ? (
                    // EĞER PSİKOLOG (Admin) İSE:
                    <button 
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none text-sm"
                      onClick={() => handleDeleteSlot(slot.id)}
                      disabled={bookingId === slot.id}
                    >
                      {bookingId === slot.id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Siliniyor...
                        </span>
                      ) : (
                        'Slotu Sil'
                      )}
                    </button>
                  ) : (
                    // EĞER HASTA İSE:
                    <button 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none text-sm"
                      onClick={() => handleBookAppointment(slot.id)}
                      disabled={bookingId === slot.id}
                    >
                      {bookingId === slot.id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Alınıyor...
                        </span>
                      ) : (
                        'Randevu Al'
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    export default AvailableSlots;