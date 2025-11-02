// src/components/AllAppointmentsList.jsx

// Bu dosya, 'AvailableSlots.jsx'in KOPYASIDIR.
// Sadece API adresi ve JSX (HTML) kısmı farklıdır.

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const API_BASE_URL = 'https://bk-api-evsk.onrender.com';

// 'AvailableSlots'tan kopyaladık:
// Bu bileşen de 'refreshKey' sinyalini dinleyecek
function AllAppointmentsList({ refreshKey }) {

  const [appointments, setAppointments] = useState([]); // 'slots' değil, 'appointments'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { accessToken } = useAuth();

  // 'AvailableSlots'tan kopyaladık:
  const fetchAppointments = useCallback(async () => {
    console.log("AllAppointmentsList: Alınan randevular çekiliyor...");
    setLoading(true);
    setError(null);

    if (!accessToken) {
      setLoading(false);
      setError("Giriş yapılmamış!");
      return;
    }

    try {
      // --- TEK DEĞİŞİKLİK BURADA ---
      // 'AvailableSlots' -> /api/v1/slots/
      // 'AllAppointmentsList' -> /api/v1/appointments/
      const response = await axios.get(`${API_BASE_URL}/api/v1/appointments/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      // 'get_queryset' (Backend GÖREV 21) sayesinde,
      // Admin (Psikolog) bu adresten TÜM randevuları çeker.

      setAppointments(response.data); // 'setSlots' değil
      console.log("AllAppointmentsList: Randevular çekildi:", response.data);

    } catch (err) {
      console.error("AllAppointmentsList: Randevu çekme hatası!", err);
      setError("Randevular çekilirken bir hata oluştu.");
    } finally {
      setLoading(false); 
    }
  }, [accessToken]); 


  // 'AvailableSlots'tan kopyaladık:
  // 'refreshKey' (sinyal) değiştiğinde, 'fetchAppointments'ı tekrar çalıştır
  useEffect(() => {
    fetchAppointments(); 
  }, [fetchAppointments, refreshKey]); // 'refreshKey'e bağladık


  // Arayüz (UI) Mantığı
  if (loading) {
    return <p>Alınan randevular yükleniyor...</p>;
  }
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // 6. JSX (HTML) Kısmı (GÜNCELLENDİ)
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', margin: '10px 0' }}>
      <h3>Alınmış Randevular (Tümü)</h3>
      {appointments.length === 0 ? (
        <p>Gösterilecek (alınmış) randevu bulunamadı.</p>
      ) : (
        <ul>
          {appointments.map(appt => (
            <li key={appt.id}> 
              <strong>Hasta:</strong> {appt.patient.first_name} {appt.patient.last_name}
              <br />
              <strong>Tarih:</strong> {new Date(appt.time_slot.start_time).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })}
              <br />
              <strong>Not:</strong> {appt.notes || "(Not bırakılmadı)"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllAppointmentsList;