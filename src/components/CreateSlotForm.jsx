// src/components/CreateSlotForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const API_BASE_URL = 'https://bk-api-evsk.onrender.com';

// YENİ: Bu, Psikolog'un slot ekledikten sonra
// Ana Slot Listesi'ni (AvailableSlots) tazelemesi için
// ona (props aracılığıyla) göndereceğimiz bir sinyaldir.
function CreateSlotForm({ onSlotCreated }) {

  // 1. Formun kendi hafızası (state)
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Global Hafızadan (AuthContext) 'accessToken'ı al
  const { accessToken } = useAuth(); 

  // 3. Form 'submit' (gönder) edildiğinde çalışacak fonksiyon
  const handleCreateSlot = async (event) => {
    event.preventDefault(); 
    setLoading(true);
    setError(null);

    // API'ye göndereceğimiz JSON verisi
    const slotData = {
      "start_time": new Date(startTime).toISOString(),
      "end_time": new Date(endTime).toISOString()
    };

    console.log("CreateSlotForm: Yeni slot yaratma isteği...", slotData);

    try {
      // GÖREV 27'deki (main.js) isteğin React hali
      const response = await axios.post(`${API_BASE_URL}/api/v1/slots/`, 
        slotData, // Body (Gövde)
        {
          headers: { 
            'Authorization': `Bearer ${accessToken}` // PSİKOLOG'un token'ı
          } 
        }
      );

      console.log("CreateSlotForm: Slot başarıyla yaratıldı!", response.data);
      alert('Müsait zaman slotu başarıyla eklendi.');

      // 4. BAŞARI: Listeyi tazele!
      // Ana bileşene (App.jsx) "Ben işimi bitirdim, listeyi tazele"
      // sinyalini (onSlotCreated) yolluyoruz.
      if (onSlotCreated) {
        onSlotCreated();
      }

      // Formu temizle
      setStartTime('');
      setEndTime('');

    } catch (err) {
      const errorData = err.response ? err.response.data : "API ile iletişim kurulamadı";
      console.error("CreateSlotForm: Slot yaratılamadı:", errorData);
      alert(`Hata: Slot yaratılamadı. (Sebep: ${JSON.stringify(errorData)})`);
      setError("Slot yaratılamadı.");
    } finally {
      setLoading(false);
    }
  };

  // 5. JSX (HTML) Kısmı
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>Yeni Müsait Slot Ekle</h3>
      <form onSubmit={handleCreateSlot}>
        <div>
          <label>Başlangıç:</label>
          <input 
            type="datetime-local" 
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Bitiş:</label>
          <input 
            type="datetime-local" 
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Ekleniyor...' : 'Slot Ekle'}
        </button>
      </form>
    </div>
  );
}

export default CreateSlotForm;