// src/pages/HomePage.jsx
// Sitemizin "Anasayfası" - Umut vaadeden, samimi karşılama sayfası

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <article className="space-y-10 md:space-y-14">
      {/* Hero Section - Umut vaadeden karşılama */}
      <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-rose-50 p-8 md:p-16 rounded-3xl shadow-xl border border-orange-200/50 relative overflow-hidden">
        {/* Animasyonlu dekoratif elementler */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-300/20 rounded-full -mr-36 -mt-36 blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300/20 rounded-full -ml-32 -mb-32 blur-2xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-200/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Floating küçük elementler */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-orange-200/30 rounded-full blur-md animate-float"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-amber-200/30 rounded-full blur-md animate-float-reverse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-rose-200/30 rounded-full blur-md animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-orange-300/20 rounded-full blur-md animate-float-reverse" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 animate-bounce-slow text-6xl md:text-7xl select-none" aria-label="Başak Emoji">
            🌾
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 bg-clip-text text-transparent">
              Her Şey Daha İyi Olabilir
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
            İşte buradayım. Sizi yargılamadan dinleyecek, birlikte anlamaya çalışacağız. 
            Çünkü bazen sadece birisinin sizi gerçekten dinlemesi, değişimin başlangıcıdır.
          </p>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed italic mb-10">
            "Herkes kendi hikayesini yazar, bazen sadece biraz desteğe ihtiyacımız olur."
          </p>

          {/* Call-to-Action Butonları */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {currentUser ? (
            <Link 
                to="/patient-panel" 
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center text-lg"
            >
                Randevu Paneline Git →
            </Link>
          ) : (
            <Link 
              to="/login" 
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center text-lg"
            >
                Randevu Al →
            </Link>
          )}
          
          <Link 
            to="/about" 
              className="w-full sm:w-auto bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 border-2 border-orange-300 hover:border-orange-400 px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center text-lg"
          >
              Beni Tanıyın
          </Link>
          </div>
        </div>
      </div>

      {/* Umut Mesajı Bölümü - Split Layout (Görsel + Metin) */}
      <VisualMessageSection />

      {/* Görsel Slider Bölümü - İSTENİRSE KALDIRILABİLİR */}
      {/* <ImageSliderSection /> */}

      {/* Hizmetler Bölümü - Animasyonlu */}
      <ServicesSection />

      {/* Süreç Görselleştirmesi - Yaratıcı Timeline */}
      <JourneyTimelineSection />

      {/* Kişisel Not */}
      <div
        className="bg-gradient-to-r from-rose-200/80 via-rose-500/80 to-red-100/80 p-8 md:p-10 rounded-3xl border-l-4 shadow-lg relative overflow-hidden"
        style={{ borderColor: "rgb(209, 97, 100)" }} // Türk bayrağı kırmızısı
      >
        {/* Dekoratif elementler (kırmızı tonlarda) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-300/40 rounded-full -mr-16 -mt-16 blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-28 h-28 bg-red-400/30 rounded-full -ml-14 -mb-14 blur-2xl animate-float-reverse"></div>
        
        <p className="relative z-10 text-base md:text-lg text-white leading-relaxed text-center italic max-w-3xl mx-auto"
           style={{
             background: "linear-gradient(90deg,rgb(212, 67, 79) 60%, #b91c1c 100%)", // Türk bayrağı kırmızısı ve koyu kırmızı
             borderRadius: "1rem",
             padding: "1.5rem 1rem",
             boxShadow: "0 4px 24px 0 rgba(200,30,46,0.12)"
           }}
        >
          <span className="text-3xl mr-3 inline-block animate-bounce-slow">💭</span>
          "Bazen en büyük cesaret, yardım istemektir. Ve burada, tam olarak doğru yerdesiniz."
        </p>
      </div>
    </article>
  );
}

// Scroll-triggered animasyon için hook
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
}

// Scroll Animasyonlu Kart Component'i
function ScrollAnimatedCard({ children, delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Hizmetler Bölümü
function ServicesSection() {
  const services = [
    {
      icon: '💔',
      title: 'İlişki Sorunları',
      description: 'İlişkilerde zorlanıyor musunuz? Partnerinizle, ailenizle veya arkadaşlarınızla yaşadığınız sorunlar sizi yıpratıyor mu? Birlikte anlayalım ve çözüm yolları bulalım.',
      gradient: 'from-rose-400 to-pink-500',
      bg: 'from-rose-50 to-pink-50',
      border: 'border-rose-200',
      hoverMessage: '💚 İletişimi yeniden kurmak, birbirini anlamak... İlişkiler canlıdır, birlikte büyütürüz.',
      hoverEmoji: '🤝'
    },
    {
      icon: '😰',
      title: 'Kaygı ve Stres',
      description: 'Kaygılarınız hayatınızı ele geçirdi mi? Sürekli endişeleniyor, rahatlayamıyor musunuz? Bu duyguları birlikte anlayıp, başa çıkma yolları bulalım.',
      gradient: 'from-amber-400 to-orange-500',
      bg: 'from-amber-50 to-orange-50',
      border: 'border-amber-200',
      hoverMessage: '🌿 Nefes almak, dinginlik bulmak... Kaygı geçicidir, siz kalıcısınız.',
      hoverEmoji: '🧘'
    },
    {
      icon: '😢',
      title: 'Üzüntü ve Depresyon',
      description: 'Her şey çok ağır mı geliyor? Üzüntü sizi kapladı mı? Günler birbirine mi karışıyor? Bu duyguları anlamak ve hafifletmek için birlikte yürüyelim.',
      gradient: 'from-blue-400 to-cyan-500',
      bg: 'from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      hoverMessage: '🌟 Karanlıkta bile ışık vardır. Birlikte o ışığı birlikte buluruz.',
      hoverEmoji: '✨'
    },
    {
      icon: '🔄',
      title: 'Hayat Değişiklikleri',
      description: 'Bir şeyler değişti ve siz bununla başa çıkamıyor musunuz? İş değişikliği, taşınma, kayıp... Hayatın zorluklarına birlikte uyum sağlayalım.',
      gradient: 'from-purple-400 to-indigo-500',
      bg: 'from-purple-50 to-indigo-50',
      border: 'border-purple-200',
      hoverMessage: '🌱 Değişim zordur ama büyümenin yolu budur. Her değişiklik yeni bir başlangıçtır.',
      hoverEmoji: '🦋'
    },
    {
      icon: '🪞',
      title: 'Kendini Tanıma',
      description: 'Kendinizi tanımakta zorlanıyor musunuz? Kim olduğunuzu, ne istediğinizi bilmiyor musunuz? Birlikte kendinizi keşfedelim.',
      gradient: 'from-green-400 to-emerald-500',
      bg: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      hoverMessage: '💎 Kendinizi keşfetmek, gerçek potansiyelinizi görmek... En güzel yolculuk bu.',
      hoverEmoji: '🔍'
    },
    {
      icon: '💭',
      title: 'Geçmişle Yüzleşme',
      description: 'Geçmişte kalan acılar bugününüzü etkiliyor mu? Eski anılar sizi rahatsız ediyor mu? Geçmişi anlamak ve iyileşmek için buradayım.',
      gradient: 'from-orange-400 to-red-500',
      bg: 'from-orange-50 to-red-50',
      border: 'border-orange-200',
      hoverMessage: '🕊️ Geçmişi bırakmak, özgürleşmek... Artık bugün sizindir.',
      hoverEmoji: '🌅'
    }
  ];

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Size Nasıl Yardımcı Olabilirim?
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Her sorunun kendine özel bir çözümü var. İşte birlikte çalışabileceğimiz alanlar...
        </p>
      </div>

      {/* Grid Layout - Hover Efektli Kartlar */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
        {/* Grid arka plan dekorasyonu */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-rose-50/30 rounded-3xl blur-3xl -z-10 animate-pulse-slow"></div>
        
        {services.map((service, index) => (
          <ScrollAnimatedCard key={index} delay={index * 100}>
            <div className={`bg-gradient-to-br ${service.bg} backdrop-blur-sm p-6 md:p-8 rounded-2xl border ${service.border} shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] h-full min-h-[380px] flex flex-col group relative overflow-hidden transform`}>
              {/* Hover efekti için arka plan */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>
              
              {/* Floating arka plan elementi */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${service.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-15 transition-opacity duration-500 animate-float`} style={{ animationDelay: `${index * 0.2}s` }}></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-3xl md:text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base flex-grow mb-4">
                  {service.description}
                </p>
                
                {/* Hover'da görünecek özel mesaj */}
                <div className="mt-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="pt-4 border-t border-gray-200 group-hover:border-orange-300 transition-colors duration-300">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300 inline-block">
                        {service.hoverEmoji}
                      </span>
                      <p className="text-sm text-gray-600 group-hover:text-orange-600 font-medium leading-relaxed transition-colors duration-300 flex-1">
                        {service.hoverMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimatedCard>
        ))}
      </div>
    </div>
  );
}

// Görsel Slider Bölümü
function ImageSliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    {
      emoji: '🌱',
      title: 'Birlikte Büyüme',
      description: 'Her adımda yanınızdayım. Birlikte güçleneceğiz.',
      gradient: 'from-green-400 to-emerald-500',
      bg: 'from-green-50 to-emerald-50'
    },
    {
      emoji: '💚',
      title: 'Güvenli Alan',
      description: 'Burada kendiniz olabilirsiniz. Yargılanmaz, eleştirilmezsiniz.',
      gradient: 'from-rose-400 to-pink-500',
      bg: 'from-rose-50 to-pink-50'
    },
    {
      emoji: '🌟',
      title: 'Umut Var',
      description: 'Her zorluk bir fırsattır. Birlikte keşfedelim.',
      gradient: 'from-amber-400 to-orange-500',
      bg: 'from-amber-50 to-orange-50'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-xl border border-orange-100 h-80 md:h-96">
      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${slides.length * 100}%` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 p-12 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden h-full"
          >
            {/* Arka plan dekorasyonu */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-amber-100/20 to-rose-100/30 animate-pulse-slow"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="text-8xl md:text-9xl mb-6 animate-bounce-slow inline-block">
                {slide.emoji}
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
                  {slide.title}
                </span>
              </h3>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-medium">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-orange-500 w-8'
                : 'bg-orange-300/50 hover:bg-orange-400'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-orange-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        aria-label="Önceki"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-orange-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        aria-label="Sonraki"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// Görsel + Metin Split Layout Bölümü
function VisualMessageSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-100 relative overflow-hidden transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Arka plan dekoratif elementler */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100/40 rounded-full -mr-20 -mt-20 blur-xl animate-float-slow"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-100/40 rounded-full -ml-16 -mb-16 blur-xl animate-float-reverse"></div>
      
      <div className="grid md:grid-cols-2 gap-0 relative z-10">
        {/* Görsel Tarafı - Sol */}
        <div className="bg-gradient-to-br from-orange-100 via-amber-50 to-rose-50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
          {/* Placeholder görsel alanı - Gerçek fotoğraf buraya konulabilir */}
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-orange-200/50 via-amber-200/50 to-rose-200/50 rounded-2xl flex items-center justify-center shadow-lg border border-orange-200/50 relative overflow-hidden group">
            {/* Görsel overlay efektleri */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-rose-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Görsel placeholder içeriği */}
            <div className="relative z-10 text-center">
              <div className="text-7xl md:text-8xl mb-4 animate-bounce-slow">💚</div>
              <p className="text-sm md:text-base text-gray-600 font-medium">
                Fotoğraf buraya eklenebilir
              </p>
            </div>
            
            {/* Dekoratif küçük elementler */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-orange-300/30 rounded-full blur-md animate-float"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-rose-300/30 rounded-full blur-md animate-float-reverse"></div>
          </div>
        </div>
        
        {/* Metin Tarafı - Sağ */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Biliyorum, Zorlanıyorsunuz
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
            <p>
              Belki bir ilişki size acı veriyor. Belki geçmişte kalan anılar bugününüzü 
              etkiliyor. Belki kaygılar sizi her gün boğuyor. Belki kendinizi bulmakta 
              zorlanıyorsunuz.
            </p>
            <p className="text-orange-600 font-semibold text-xl md:text-2xl">
              Ama bilin ki, bunların hepsi değişebilir. 💚
            </p>
            <p>
              Ben buradayım. Sizi anlamak, dinlemek ve birlikte yürümek için. 
              Her adımda yanınızdayım.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Süreç/Journey Timeline Bölümü - Yaratıcı Görselleştirme
function JourneyTimelineSection() {
  const [ref, isVisible] = useScrollAnimation();

  const steps = [
    {
      emoji: '👋',
      title: 'Merhaba',
      description: 'Bana ulaşın. WhatsApp\'tan veya randevu sisteminden kolayca iletişime geçebilirsiniz.',
      color: 'from-orange-400 to-amber-500',
      bg: 'from-orange-50 to-amber-50'
    },
    {
      emoji: '💬',
      title: 'Konuşalım',
      description: 'Birlikte konuşalım. Sizi dinleyeceğim, anlamaya çalışacağım. İhtiyaçlarınızı birlikte belirleyelim.',
      color: 'from-rose-400 to-pink-500',
      bg: 'from-rose-50 to-pink-50'
    },
    {
      emoji: '🌱',
      title: 'Yürüyelim',
      description: 'Birlikte yürüyelim. Her adımda yanınızdayım. Değişim küçük adımlarla başlar.',
      color: 'from-green-400 to-emerald-500',
      bg: 'from-green-50 to-emerald-50'
    },
    {
      emoji: '🌟',
      title: 'Büyüyelim',
      description: 'Birlikte büyüyelim. Her gün biraz daha güçlenir, kendinizi daha iyi anlarsınız.',
      color: 'from-purple-400 to-indigo-500',
      bg: 'from-purple-50 to-indigo-50'
    }
  ];

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-white via-orange-50/30 to-amber-50/20 rounded-3xl shadow-xl border border-orange-100 p-8 md:p-12 relative overflow-hidden transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Arka plan dekorasyonu */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-amber-100/10 to-rose-100/20 animate-pulse-slow"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Birlikte Yürüyeceğimiz Yol
          </h2>
        </div>
        
        {/* Timeline - Yatay veya Dikey Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {/* Timeline çizgisi - Desktop'ta */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-orange-300 via-amber-300 to-orange-300 opacity-30"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="hidden lg:block absolute -top-10 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full border-4 border-white shadow-lg z-10"></div>
              
              <ScrollAnimatedCard delay={index * 150}>
                <div className={`bg-gradient-to-br ${step.bg} p-6 md:p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full group relative overflow-hidden`}>
                  {/* Hover efekti */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="relative z-10">
                    {/* Emoji */}
                    <div className="text-5xl md:text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">
                      {step.emoji}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollAnimatedCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;