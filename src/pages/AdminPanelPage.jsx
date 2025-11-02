// src/pages/AdminPanelPage.jsx
// Kapsamlı Yönetim Paneli - Sadece Admin (is_staff) kullanıcılar için

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import AvailableSlots from '../components/AvailableSlots';
import CreateSlotForm from '../components/CreateSlotForm';
import AllAppointmentsList from '../components/AllAppointmentsList';

function AdminPanelPage() {
  const { currentUser } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'slots', 'appointments'

  const triggerRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Güvenlik kontrolü
  if (!currentUser || !currentUser.is_staff) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <p className="text-red-700 font-semibold">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hoşgeldin ve İstatistikler Bölümü */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-blue-800 text-white p-6 md:p-8 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Yönetim Paneli
            </h1>
            <p className="text-blue-100 text-lg">
              Hoşgeldiniz, {currentUser.first_name || currentUser.email}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
              Admin
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-t border-white/20 pt-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-white text-blue-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('slots')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'slots'
                ? 'bg-white text-blue-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            📅 Zaman Slotları
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'appointments'
                ? 'bg-white text-blue-600'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            📋 Tüm Randevular
          </button>
        </div>
      </div>

      {/* Tab İçerikleri */}
      {activeTab === 'dashboard' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Hızlı İşlemler */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Hızlı İşlemler</h2>
            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('slots')}
                className="w-full text-left p-4 bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded-lg border border-gray-200 transition-all duration-200"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">➕</span>
                  <div>
                    <p className="font-semibold text-gray-800">Yeni Slot Ekle</p>
                    <p className="text-sm text-gray-600">Yeni bir randevu zamanı oluştur</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-lg border border-gray-200 transition-all duration-200"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">👁️</span>
                  <div>
                    <p className="font-semibold text-gray-800">Tüm Randevuları Görüntüle</p>
                    <p className="text-sm text-gray-600">Alınan randevuları listeleyin</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Bilgilendirme */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sistem Bilgileri</h2>
            <div className="space-y-4">
              <div className="bg-white/60 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Yönetim Paneli</p>
                <p className="text-lg font-semibold text-gray-800">Dr. Başak Şeref</p>
                <p className="text-sm text-gray-600 mt-1">Psikolojik Danışmanlık Yönetim Sistemi</p>
              </div>
              <div className="bg-white/60 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Bu panelden tüm randevuları görüntüleyebilir, zaman slotlarını yönetebilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'slots' && (
        <div className="space-y-6">
          {/* Slot Oluşturma Formu */}
          <CreateSlotForm onSlotCreated={triggerRefresh} />
          
          {/* Müsait Slotlar Listesi */}
          <AvailableSlots 
            refreshKey={refreshKey} 
            onAppointmentBooked={triggerRefresh}
          />
        </div>
      )}

      {activeTab === 'appointments' && (
        <div>
          {/* Tüm Alınmış Randevular Listesi */}
          <AllAppointmentsList refreshKey={refreshKey} />
        </div>
      )}
    </div>
  );
}

export default AdminPanelPage;

