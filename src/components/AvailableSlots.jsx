    // src/components/AvailableSlots.jsx (NİHAİ DOĞRU HALİ)

import React, { useState, useEffect, useCallback } from 'react';
import apiClient, { API_BASE_URL } from '../utils/apiClient.js';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

    // 'refreshKey' (sinyal) ve 'onAppointmentBooked' (sinyal gönderici)
    // prop'larını Ebeveyn'den (App.jsx) alıyoruz
    function AvailableSlots({ refreshKey, onAppointmentBooked }) {
      
      const [slots, setSlots] = useState([]); 
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [bookingId, setBookingId] = useState(null);
      const [selectedSlot, setSelectedSlot] = useState(null); // Seçilen slot
      const [appointmentNote, setAppointmentNote] = useState(''); // Randevu notu
      const [showNoteModal, setShowNoteModal] = useState(false); // Not modal açık/kapalı 

      // Global Hafıza'dan currentUser'ı alıyoruz (role göre görüntüleme için)
      const { currentUser } = useAuth();
      
      // API'den müsait slotları çeken fonksiyon
      const fetchSlots = useCallback(async () => {
        
        // --- İŞTE İLK LOGLAMA BURADA ---
        console.log("AvailableSlots: Slotlar çekiliyor...");
        
        setLoading(true);
        setError(null);

        try {
          const response = await apiClient.get('/api/v1/slots/');
          
          // Backend'den gelen slotları filtrele: Sadece müsait (is_booked: false) olanları göster
          // Eğer backend zaten filtreliyorsa bu işlem gereksiz olabilir, ama güvenlik için ekliyoruz
          const availableSlots = Array.isArray(response.data) 
            ? response.data.filter(slot => slot.is_booked === false || slot.is_booked === undefined)
            : [];
          
          setSlots(availableSlots);
          
          // --- İŞTE İKİNCİ LOGLAMA BURADA ---
          console.log("AvailableSlots: Slotlar çekildi (filtrelenmiş):", availableSlots);
          
        } catch (err) {
          console.error("AvailableSlots: Slot çekme hatası!", err);
          const errorMessage = err?.error?.message || 
                              "Slotlar çekilirken bir hata oluştu.";
          setError(errorMessage);
        } finally {
          setLoading(false); 
        }
      }, []); // API client token'ı otomatik yönetiyor

      
      // 'useEffect', hem ilk yüklemede hem de 'refreshKey' (sinyal) değiştiğinde
      // 'fetchSlots'u tetikler.
      useEffect(() => {
        fetchSlots(); 
      }, [fetchSlots, refreshKey]); 

      
      // Slot seçme - Not girişi için modal aç
      const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
        setAppointmentNote('');
        setShowNoteModal(true);
      };

      // Modal'ı kapat
      const handleCloseModal = () => {
        setShowNoteModal(false);
        setSelectedSlot(null);
        setAppointmentNote('');
      };

      // "Randevu Al" (Hasta) - Not ile birlikte
      const handleBookAppointment = async () => {
        if (!selectedSlot) return;

        console.log(`Randevu alma isteği başladı. Slot ID: ${selectedSlot.id}`);
        setBookingId(selectedSlot.id); 
        setError(null);

        try {
          await apiClient.post('/api/v1/appointments/', {
            "time_slot_id": selectedSlot.id, 
            "notes": appointmentNote || ""
          });
          
          console.log("Randevu başarıyla alındı:", selectedSlot.id);
          
          // Modal'ı kapat
          handleCloseModal();

          // BAŞARI: Ebeveyn'e haber ver
          if (onAppointmentBooked) {
              onAppointmentBooked();
          }

          // Başarı mesajı
          toast.success('Randevunuz başarıyla oluşturuldu! 🎉');

        } catch (err) {
          console.error("Randevu alınamadı:", err);
          const errorMessage = err?.error?.message || 
                              err?.error?.detail || 
                              "Randevu alınamadı. Lütfen tekrar deneyin.";
          setError(errorMessage);
          toast.error(errorMessage);
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
          await apiClient.delete(`/api/v1/slots/${slotId}/`);
          
          console.log("Slot başarıyla silindi. ID:", slotId);
          toast.success('Müsait zaman slotu başarıyla silindi.');
          
          // BAŞARI: Listeyi direkt tazele
          fetchSlots(); 

        } catch (err) {
          console.error("Slot silinemedi:", err);
          const errorMessage = err?.error?.message || 
                              err?.error?.detail || 
                              "Slot silinemedi.";
          toast.error(`Hata: ${errorMessage}`);
          setError(errorMessage);
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
        <>
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
                      // EĞER HASTA İSE: "Seç" butonu
                      <button 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none text-sm"
                        onClick={() => handleSelectSlot(slot)}
                        disabled={loading}
                      >
                        Seç
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        {/* Not Girişi Modal'ı - Sadece hasta için */}
        {showNoteModal && selectedSlot && !currentUser?.is_staff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Randevu Notu Ekle</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-semibold">Seçilen Tarih:</span>{' '}
                    {new Date(selectedSlot.start_time).toLocaleString('tr-TR', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="appointment_note">
                    Not (İsteğe Bağlı)
                  </label>
                  <textarea
                    id="appointment_note"
                    rows="4"
                    value={appointmentNote}
                    onChange={(e) => setAppointmentNote(e.target.value)}
                    placeholder="Randevunuz hakkında bir not ekleyebilirsiniz..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-none"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg mb-4">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={handleCloseModal}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    disabled={loading || bookingId === selectedSlot.id}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading || bookingId === selectedSlot.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Randevu Alınıyor...
                      </>
                    ) : (
                      'Randevu Al'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }

    export default AvailableSlots;