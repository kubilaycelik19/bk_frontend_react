// src/components/CreateSlotForm.jsx
// Modern ve kullanıcı dostu slot ekleme formu

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx'; 

const API_BASE_URL = 'https://bk-api-evsk.onrender.com';

function CreateSlotForm({ onSlotCreated }) {
  // Form state
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(60); // Dakika cinsinden (varsayılan 60 dakika)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Global Hafızadan (AuthContext) 'accessToken'ı al
  const { accessToken } = useAuth();

  // Süre seçenekleri (dakika)
  const durationOptions = [30, 45, 60, 90, 120];

  // Hızlı tarih seçim fonksiyonları
  const setQuickDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const dateString = date.toISOString().split('T')[0];
    setStartDate(dateString);
  }; 

  // Form submit fonksiyonu
  const handleCreateSlot = async (event) => {
    event.preventDefault(); 
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Tarih ve saat kontrolü
    if (!startDate || !startTime) {
      setError('Lütfen tarih ve saat seçin.');
      setLoading(false);
      return;
    }

    // Başlangıç ve bitiş zamanlarını oluştur
    const startDateTime = `${startDate}T${startTime}`;
    const startDateObj = new Date(startDateTime);
    const endDateObj = new Date(startDateObj.getTime() + duration * 60000);

    // Geçmiş tarih kontrolü
    if (startDateObj < new Date()) {
      setError('Geçmiş bir tarih seçemezsiniz.');
      setLoading(false);
      return;
    }

    // API'ye göndereceğimiz JSON verisi
    const slotData = {
      "start_time": startDateObj.toISOString(),
      "end_time": endDateObj.toISOString()
    };

    console.log("CreateSlotForm: Yeni slot yaratma isteği...", slotData);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/slots/`, 
        slotData,
        {
          headers: { 
            'Authorization': `Bearer ${accessToken}`
          } 
        }
      );

      console.log("CreateSlotForm: Slot başarıyla yaratıldı!", response.data);
      
      // Başarı mesajı
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);

      // Listeyi tazele
      if (onSlotCreated) {
        onSlotCreated();
      }

      // Formu temizle
      setStartDate('');
      setStartTime('');
      setDuration(60);

    } catch (err) {
      const errorData = err.response ? err.response.data : "API ile iletişim kurulamadı";
      console.error("CreateSlotForm: Slot yaratılamadı:", errorData);
      
      let errorMessage = "Slot yaratılamadı.";
      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (typeof errorData === 'object') {
        errorMessage = JSON.stringify(errorData);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // JSX Kısmı - Modern tasarım
  return (
    <div className="bg-gradient-to-br from-white to-green-50 p-6 md:p-8 rounded-xl shadow-lg border border-gray-200">
      {/* Başlık Bölümü */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <span className="text-3xl mr-3">📅</span>
          <h3 className="text-2xl font-bold text-gray-800">Yeni Randevu Slotu Oluştur</h3>
        </div>
        <p className="text-gray-600 text-sm ml-11">Müsait zamanlarınızı ekleyerek hastalarınızın randevu almasını sağlayın</p>
      </div>

      {/* Hızlı Tarih Seçim Butonları */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-3">
          <span className="mr-2">⚡</span>Hızlı Seçim
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setQuickDate(0)}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Bugün
          </button>
          <button
            type="button"
            onClick={() => setQuickDate(1)}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            Yarın
          </button>
          <button
            type="button"
            onClick={() => setQuickDate(7)}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            1 Hafta Sonra
          </button>
          <button
            type="button"
            onClick={() => setQuickDate(14)}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            2 Hafta Sonra
          </button>
        </div>
      </div>
      
      <form onSubmit={handleCreateSlot} className="space-y-6">
        {/* Tarih ve Saat Bölümü */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="start_date">
              <span className="mr-2">📆</span>Tarih
            </label>
            <input 
              id="start_date"
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              disabled={loading}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="start_time">
              <span className="mr-2">🕐</span>Başlangıç Saati
            </label>
            <input 
              id="start_time"
              type="time" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed bg-white"
            />
          </div>
        </div>

        {/* Süre Seçimi */}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="duration">
            <span className="mr-2">⏱️</span>Randevu Süresi
          </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {durationOptions.map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDuration(dur)}
                    disabled={loading}
                    className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                      duration === dur
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-400 hover:bg-green-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {dur} dk
                  </button>
                ))}
              </div>
          <p className="mt-2 text-xs text-gray-500">
            Bitiş saati: {startDate && startTime ? (() => {
              const start = new Date(`${startDate}T${startTime}`);
              const end = new Date(start.getTime() + duration * 60000);
              return end.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
            })() : 'Tarih ve saat seçin'}
          </p>
        </div>

        {/* Önizleme Kartı */}
        {startDate && startTime && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">📋 Slot Önizlemesi</p>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Tarih:</span> {new Date(startDate).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><span className="font-medium">Başlangıç:</span> {startTime}</p>
              <p><span className="font-medium">Bitiş:</span> {(() => {
                const start = new Date(`${startDate}T${startTime}`);
                const end = new Date(start.getTime() + duration * 60000);
                return end.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
              })()}</p>
              <p><span className="font-medium">Süre:</span> {duration} dakika</p>
            </div>
          </div>
        )}
        
        {/* Hata Mesajı */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-pulse">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-2">⚠️</span>
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Başarı Mesajı */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg animate-pulse">
            <div className="flex items-center">
              <span className="text-green-500 text-xl mr-2">✅</span>
              <p className="text-green-700 text-sm font-medium">Slot başarıyla oluşturuldu!</p>
            </div>
          </div>
        )}
        
            {/* Gönder Butonu */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button 
                type="submit" 
                disabled={loading || !startDate || !startTime}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ekleniyor...
              </>
            ) : (
              <>
                <span className="mr-2">➕</span>
                Slot Oluştur
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSlotForm;