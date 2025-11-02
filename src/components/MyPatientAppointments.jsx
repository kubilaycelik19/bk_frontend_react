// src/components/MyPatientAppointments.jsx

import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../utils/apiClient.js';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

function MyPatientAppointments({ refreshKey, onAppointmentCancelled }) {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null); // İptal edilen randevu ID'si

  // API client token'ı otomatik yönetiyor, accessToken'a ihtiyacımız yok

  const fetchMyAppointments = useCallback(async () => {
    console.log("MyPatientAppointments: 'Benim' randevularım çekiliyor...");
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get('/api/v1/appointments/');

      // Güvenlik: Null/undefined kontrolü ve eksik veri filtresi
      // Response.data boş dizi olabilir (randevu yoksa) veya hata olabilir
      if (!response || !response.data) {
        console.warn("MyPatientAppointments: Response veya response.data boş");
        setAppointments([]);
        return;
      }

      const validAppointments = Array.isArray(response.data) 
        ? response.data.filter(appt => {
            // Çok katmanlı null kontrolü
            if (!appt || !appt.id) return false;
            if (!appt.time_slot || typeof appt.time_slot !== 'object') return false;
            if (!appt.time_slot.start_time) return false;
            return true;
          })
        : [];

      setAppointments(validAppointments);
      setError(null); // Başarılı olursa hata mesajını temizle
      console.log("MyPatientAppointments: Randevular çekildi (filtrelenmiş):", validAppointments);

    } catch (err) {
      console.error("MyPatientAppointments: Randevu çekme hatası!", err);
      
      // Hata koduna göre özel mesajlar
      if (err?.error?.code === 'NOT_FOUND') {
        // 404 hatası - randevu yoksa veya sayfa bulunamadıysa
        const notFoundMessage = "Randevunuz bulunamadı veya sayfa bulunamadı. Liste yenileniyor...";
        setError(notFoundMessage);
        setAppointments([]); // Boş liste göster
        toast.info(notFoundMessage);
        // Listeyi otomatik yenile
        setTimeout(() => {
          fetchMyAppointments();
        }, 1000);
      } else if (err?.error?.code === 'UNAUTHORIZED') {
        const unauthorizedMessage = "Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.";
        setError(unauthorizedMessage);
        setAppointments([]);
        toast.error(unauthorizedMessage);
      } else {
        const errorMessage = err?.error?.message || 
                            err?.error?.detail ||
                            "Randevular çekilirken bir hata oluştu.";
        setError(errorMessage);
        toast.error(errorMessage);
        setAppointments([]); // Hata durumunda boş liste göster
      }
    } finally {
      setLoading(false); 
    }
  }, []); // API client token'ı otomatik yönetiyor 


  // 'refreshKey' (sinyal) değiştiğinde, 'fetchAppointments'ı tekrar çalıştır
  useEffect(() => {
    fetchMyAppointments(); 
  }, [fetchMyAppointments, refreshKey]);

  // Randevu iptal fonksiyonu
  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Bu randevuyu iptal etmek istediğinizden emin misiniz?')) {
      return;
    }

    setCancellingId(appointmentId);
    setError(null);

    try {
      await apiClient.delete(`/api/v1/appointments/${appointmentId}/`);

      console.log("Randevu başarıyla iptal edildi:", appointmentId);
      toast.success('Randevunuz başarıyla iptal edildi.');

      // Listeyi tazele
      fetchMyAppointments();

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
        fetchMyAppointments(); // Listeyi yeniden çek
        toast.info('Randevu zaten silinmiş veya bulunamadı. Liste yenilendi.');
        setCancellingId(null);
        return;
      }
      
      const errorMessage = err?.error?.message || 
                          err?.error?.detail || 
                          "Randevu iptal edilemedi.";
      
      toast.error(`Hata: ${errorMessage}`);
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
          <span className="ml-3 text-gray-600 font-medium">Randevularım yükleniyor...</span>
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
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Randevularım</h3>
        <p className="text-gray-600 text-sm">{appointments.length} aktif randevunuz bulunuyor</p>
      </div>
      
      {appointments.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-400 text-4xl mb-3">📅</div>
          <p className="text-gray-600 font-medium">Henüz randevunuz bulunmuyor.</p>
          <p className="text-gray-500 text-sm mt-2">Yukarıdaki müsait slotlardan randevu alabilirsiniz.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {appointments.map(appt => {
            // Güvenlik: Null/undefined kontrolü - eğer veri eksikse bu randevuyu render etme
            if (!appt || !appt.time_slot || !appt.time_slot.start_time) {
              return null;
            }

            return (
              <div 
                key={appt.id} 
                className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              > 
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-blue-600 text-xl mr-3">📅</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Randevu Tarihi</p>
                      <p className="text-gray-900 font-semibold text-lg">
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
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Not</p>
                    <p className="text-gray-700 text-sm sm:text-base break-words">{appt.notes || <span className="italic text-gray-500">(Not bırakılmadı)</span>}</p>
                  </div>
                </div>
              </div>
              
              {/* Randevu İptal Butonu */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleCancelAppointment(appt.id)}
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

export default MyPatientAppointments;