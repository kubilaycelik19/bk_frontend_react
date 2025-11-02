// src/pages/AboutPage.jsx
// Sitemizin "Hakkımda" sayfası

import React from 'react';

function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Başlık Bölümü */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-t-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Hakkımda</h1>
        <p className="text-blue-100 text-lg">Uzman Psikolog - Dr. Başak Şeref</p>
      </div>

      {/* İçerik Bölümü */}
      <div className="bg-white p-8 md:p-12 rounded-b-2xl shadow-lg border-t-0">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Merhaba, ben <strong className="text-gray-900">Dr. Başak Şeref</strong>. 
              <span className="text-blue-600 font-semibold"> [Buraya Uzmanlık Alanı, örn: Bilişsel Davranışçı Terapi] </span>
              üzerine uzmanlaşmış bir klinik psikoloğum. 
              BAKÜ Devlet Üniversitesi'nde aldığım eğitimin ardından... 
              (Bu kısım profesyonel bir metin olmalı).
            </p>
          </div>

          <div className="border-l-4 border-blue-600 pl-6 my-8 bg-blue-50 p-6 rounded-r-lg">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Misyonum</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Amacım, her bireyin kendi içsel gücünü keşfetmesine ve daha sağlıklı, daha bilinçli bir yaşam sürmesine 
              yardımcı olmaktır. Güvenli ve yargılayıcı olmayan bir alan yaratarak, her danışanımın kendini 
              özgürce ifade edebileceği bir ortam sunuyorum.
            </p>
          </div>

          {/* Gelecekte eklenebilir: Fotoğraf, sertifikalar, eğitim bilgileri */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-sm italic">
              💡 Buraya fotoğraf, sertifikalar ve detaylı eğitim bilgileri eklenebilir.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default AboutPage;
