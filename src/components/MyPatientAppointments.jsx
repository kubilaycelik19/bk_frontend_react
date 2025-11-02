// src/components/MyPatientAppointments.jsx

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const API_BASE_URL = 'https://bk-api-evsk.onrender.com';

// Bu bileşen de 'refreshKey' sinyalini dinleyecek
// (Böylece Hasta randevu aldığında bu liste de tazelenir)
function MyPatientAppointments({ refreshKey }) {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { accessToken } = useAuth();

  const fetchMyAppointments = useCallback(async () => {
    console.log("MyPatientAppointments: 'Benim' randevularım çekiliyor...");
    setLoading(true);
    setError(null);

    if (!accessToken) {
      setLoading(false);
      setError("Giriş yapılmamış!");
      return;
    }

    try {
      // API adresi AYNI (/api/v1/appointments/)
      // Ama Backend (Render), token'ın HASTA'ya ait olduğunu
      // görecek ve 'get_queryset' sayesinde SADECE bu hastanın
      // randevularını döndürecek.
      const response = await axios.get(`${API_BASE_URL}/api/v1/appointments/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      setAppointments(response.data);
      console.log("MyPatientAppointments: Randevular çekildi:", response.data);

    } catch (err) {
      console.error("MyPatientAppointments: Randevu çekme hatası!", err);
      setError("Randevular çekilirken bir hata oluştu.");
    } finally {
      setLoading(false); 
    }
  }, [accessToken]); 


  // 'refreshKey' (sinyal) değiştiğinde, 'fetchAppointments'ı tekrar çalıştır
  useEffect(() => {
    fetchMyAppointments(); 
  }, [fetchMyAppointments, refreshKey]); 


  // Arayüz (UI) Mantığı
  if (loading) {
    return <p>Randevularım yükleniyor...</p>;
  }
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // 6. JSX (HTML) Kısmı
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', margin: '10px 0' }}>
      <h3>Randevularım</h3>
      {appointments.length === 0 ? (
        <p>Gösterilecek (alınmış) randevu bulunamadı.</p>
      ) : (
        <ul>
          {appointments.map(appt => (
            <li key={appt.id}> 
              {/* Hasta zaten kendi adını biliyor,
                  o yüzden 'patient' objesini göstermeye gerek yok */}
              <strong>Tarih:</strong> {new Date(appt.time_slot.start_time).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })}
              <br />
              <strong>Not:</strong> {appt.notes || "(Not bırakılmadı)"}

              {/* TODO (V5.0): Randevu İptal Butonu buraya eklenebilir */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPatientAppointments;