// src/components/Layout.jsx

import React from 'react';
// YENİ: 'react-router-dom'dan 'Outlet'i (Priz) alıyoruz
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';  // Dosya adı gerçekten 'Navbar.jsx' ise bu doğru.
// Footer'ı (Alt Bilgi) import ediyoruz
import Footer from './Footer';
// WhatsApp Widget'ı import ediyoruz
import WhatsAppWidget from './WhatsAppWidget';

function Layout() {
  return (
    // Semantic HTML: <div> yerine fragment veya semantic wrapper
    // Tailwind (Tasarım): Tüm siteyi kapla (min-h-screen)
    // ve dikey bir flex kolonu ol (flex flex-col)
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white">
      
      {/* 1. VİTRİN: Navbar her zaman en üstte - Semantic <nav> zaten Navbar içinde */}
      <Navbar />

      {/* 2. ANA İÇERİK - Semantic <main> elementi */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* 'react-router-dom' buraya
            o anki adrese (URL) ait sayfayı (HomePage vb.)
            otomatik olarak enjekte edecek.
        */}
        <Outlet />
        
      </main>

      {/* 3. ALT BİLGİ: Footer her zaman en altta - Semantic <footer> zaten Footer içinde */}
      <Footer />

      {/* 4. WHATSAPP WIDGET: Sağ alt köşede sabit WhatsApp chat widget'ı */}
      <WhatsAppWidget />
    </div>
  );
}

export default Layout;