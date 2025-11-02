// src/components/AllAppointmentsList.jsx

// Bu dosya, 'AvailableSlots.jsx'in KOPYASIDIR.
// Sadece API adresi ve JSX (HTML) kısmı farklıdır.

import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../utils/apiClient.js';
import { useAuth } from '../context/AuthContext.jsx';

// 'AvailableSlots'tan kopyaladık:
// Bu bileşen de 'refreshKey' sinyalini dinleyecek
function AllAppointmentsList({ refreshKey, onAppointmentCancelled }) {

  const [appointments, setAppointments] = useState([]); // 'slots' değil, 'appointments'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null); // İptal edilen randevu ID'si

  // API client token'ı otomatik yönetiyor, accessToken'a ihtiyacımız yok

  // 'AvailableSlots'tan kopyaladık:
  const fetchAppointments = useCallback(async () => {
    console.log("AllAppointmentsList: Alınan randevular çekiliyor...");
    setLoading(true);
    setError(null);

    try {
      // --- TEK DEĞİŞİKLİK BURADA ---
      // 'AvailableSlots' -> /api/v1/slots/
      // 'AllAppointmentsList' -> /api/v1/appointments/
      const response = await apiClient.get('/api/v1/appointments/');

      // 'get_queryset' (Backend GÖREV 21) sayesinde,
      // Admin (Psikolog) bu adresten TÜM randevuları çeker.

      // Güvenlik: Null/undefined kontrolü ve eksik veri filtresi
      const validAppointments = Array.isArray(response.data) 
        ? response.data.filter(appt => 
            appt && 
            appt.id && 
            appt.patient && 
            appt.time_slot && 
            appt.time_slot.start_time
          )
        : [];

      setAppointments(validAppointments); // 'setSlots' değil
      console.log("AllAppointmentsList: Randevular çekildi (filtrelenmiş):", validAppointments);

    } catch (err) {
      console.error("AllAppointmentsList: Randevu çekme hatası!", err);
      
      // Hata koduna göre özel mesajlar
      if (err?.error?.code === 'NOT_FOUND') {
        setError("Sayfa bulunamadı. Lütfen sayfayı yenileyin.");
        setAppointments([]); // Boş liste göster
      } else if (err?.error?.code === 'UNAUTHORIZED') {
        setError("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
      } else {
        const errorMessage = err?.error?.message || 
                            "Randevular çekilirken bir hata oluştu.";
        setError(errorMessage);
      }
    } finally {
      setLoading(false); 
    }
  }, []); // API client token'ı otomatik yönetiyor 


  // 'AvailableSlots'tan kopyaladık:
  // 'refreshKey' (sinyal) değiştiğinde, 'fetchAppointments'ı tekrar çalıştır
  useEffect(() => {
    fetchAppointments(); 
  }, [fetchAppointments, refreshKey]); // 'refreshKey'e bağladık

  // Admin için randevu iptal fonksiyonu
  const handleCancelAppointment = async (appointmentId, patientName) => {
    if (!window.confirm(`${patientName} adlı hastanın randevusunu iptal etmek istediğinizden emin misiniz?`)) {
      return;
    }

    setCancellingId(appointmentId);
    setError(null);

    try {
      await apiClient.delete(`/api/v1/appointments/${appointmentId}/`);

      console.log("Randevu başarıyla iptal edildi:", appointmentId);
      alert('Randevu başarıyla iptal edildi.');

      // Listeyi tazele
      fetchAppointments();

      // Slot listesinin de yenilenmesi için sinyal gönder
      // Backend işleminin tamamlanması için kısa bir gecikme ekliyoruz
      // (Eğer randevu tarihi geçmemişse, slot tekrar müsait olmalı)
      if (onAppointmentCancelled) {
        // Backend'in slot durumunu güncellemesi için kısa bir gecikme
        setTimeout(() => {
          onAppointmentCancelled();
        }, 500);
      }

    } catch (err) {
      console.error("Randevu iptal edilemedi:", err);
      
      // 404 hatası - randevu zaten silinmiş olabilir, listeyi yenile
      if (err?.error?.code === 'NOT_FOUND') {
        console.log("Randevu zaten silinmiş, liste yenileniyor...");
        fetchAppointments(); // Listeyi yeniden çek
        alert('Randevu zaten silinmiş veya bulunamadı. Liste yenilendi.');
        setCancellingId(null);
        return;
      }
      
      const errorMessage = err?.error?.message || 
                          err?.error?.detail || 
                          "Randevu iptal edilemedi.";
      
      alert(`Hata: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setCancellingId(null);
    }
  };


  // Arayüz (UI) Mantığı
  if (loading) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-center py-8">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-3 text-gray-600 font-medium">Alınan randevular yükleniyor...</span>
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
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Alınmış Randevular (Tümü)</h3>
        <p className="text-gray-600 text-sm">{appointments.length} randevu bulundu</p>
      </div>
      
      {appointments.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-400 text-4xl mb-3">📋</div>
          <p className="text-gray-600 font-medium">Gösterilecek randevu bulunamadı.</p>
          <p className="text-gray-500 text-sm mt-2">Henüz alınmış randevu yok.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map(appt => {
            // Güvenlik: Null/undefined kontrolü - eğer veri eksikse bu randevuyu render etme
            if (!appt || !appt.patient || !appt.time_slot || !appt.time_slot.start_time) {
              return null;
            }

            return (
              <div 
                key={appt.id} 
                className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              > 
                <div className="space-y-2">
                  <div className="flex items-start">
                    <span className="text-purple-600 text-xl mr-3">👤</span>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Hasta</p>
                      <p className="text-gray-900 font-semibold text-lg">
                        {appt.patient?.first_name || 'İsimsiz'} {appt.patient?.last_name || ''}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-2 border-t border-gray-200">
                    <span className="text-blue-600 text-xl mr-3">📅</span>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Tarih & Saat</p>
                      <p className="text-gray-800 font-medium">
                        {appt.time_slot?.start_time 
                          ? new Date(appt.time_slot.start_time).toLocaleString('tr-TR', { 
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Tarih bilgisi yok'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start pt-2 border-t border-gray-200">
                    <span className="text-green-600 text-xl mr-3">📝</span>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Not</p>
                      <p className="text-gray-700 text-sm sm:text-base break-words">{appt.notes || <span className="italic text-gray-500">(Not bırakılmadı)</span>}</p>
                    </div>
                  </div>
                </div>

                {/* Admin için Randevu İptal Butonu */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleCancelAppointment(appt.id, `${appt.patient?.first_name || 'İsimsiz'} ${appt.patient?.last_name || ''}`)}
                    disabled={cancellingId === appt.id}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {cancellingId === appt.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        İptal Ediliyor...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">❌</span>
                        Randevuyu İptal Et
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AllAppointmentsList;