// src/pages/AboutPage.tsx
// Kişisel hikaye ve samimi "Hakkımda" sayfası

import React, { useEffect, useRef, useState } from 'react'
import profileImage from '../images/profile.jpg'
import { Helmet } from 'react-helmet-async'
import { OG_IMAGE_URL, SITE_URL } from '../constants/seo'

type ScrollAnimationHookReturn = [
  React.RefObject<HTMLDivElement | null>,
  boolean,
]

function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <Helmet>
        <title>Hakkımda | Psk. Başak Şeref</title>
        <meta
          name="description"
          content="Psk. Başak Şeref'in uzmanlık alanları, terapi yaklaşımı ve danışanlarıyla çalışma prensipleri hakkında bilgi alın."
        />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:title" content="Hakkımda | Psk. Başak Şeref" />
        <meta
          property="og:description"
          content="Psk. Başak Şeref'in uzmanlık alanları ve terapi yaklaşımı hakkında bilgi alın."
        />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
      </Helmet>
      {/* Başlık Bölümü - Modern ve Kibar */}
      <div className="relative overflow-hidden">
        {/* Arka plan - Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50/30 to-rose-50/20 rounded-3xl"></div>

        {/* Dekoratif elementler - Çok subtle */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200/20 rounded-full -mr-36 -mt-36 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        {/* İçerik */}
        <div className="relative z-10 bg-white/60 backdrop-blur-md rounded-3xl border-2 border-orange-300/60 shadow-xl p-8 md:p-12 lg:p-16">
          <div className="text-center max-w-3xl mx-auto">
            {/* Emoji - Daha zarif */}
            <div className="inline-block mb-6 transform hover:scale-110 transition-transform duration-300">
              <div className="text-6xl md:text-7xl animate-bounce-slow">👋</div>
            </div>

            {/* Başlık - Modern tipografi */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
                Merhaba, Ben Başak
              </span>
            </h1>

            {/* Alt başlık - Zarif */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-orange-700"></div>
              <p className="text-base md:text-lg text-gray-600 font-medium">
                Psikolog • Yol Arkadaşın
              </p>
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-orange-700"></div>
            </div>

            {/* Mesaj - Kibar ve modern */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
              Burada yargılanmazsınız. Sadece dinlenir, anlaşılır ve desteklenirsiniz.
              <span className="block mt-2 text-orange-600 font-medium">
                Her adımda yanınızdayım.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Kişisel Hikaye Bölümü - Split Layout (Görsel + Metin) */}
      <StoryWithImageSection />

      {/* Hayatımdan Bölümü - Samimi, Klişe Olmayan Kartlar */}
      <HayatimdanMasonrySection />

      {/* Nasıl Çalışırım Bölümü - Scroll-triggered Animasyonlu Kartlar */}
      <NasilCalisirimSection />

      {/* Birlikte Yürüyelim mi - Özelleştirilmiş */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white p-10 md:p-14 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Dekoratif elementler */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20 blur-2xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="text-6xl md:text-7xl mb-6 animate-bounce-slow inline-block">
            💚
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Birlikte Yürümek ister misin?
          </h2>
          <p className="text-lg md:text-xl text-white/95 leading-relaxed mb-8 font-medium">
            Bu yolculukta yalnız değilsiniz. Sorularınız, merak ettikleriniz, sadece
            konuşmak istediğiniz şeyler... Hepsi için buradayım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/905060635312?text=Merhaba,%20randevu%20almak%20istiyorum.%20Bilgi%20verebilir%20misiniz?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold text-sm md:text-base hover:bg-white/30 transition-colors duration-200"
            >
              WhatsApp'tan ulaşabilirsiniz
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

// Scroll-triggered animasyon için hook
function useScrollAnimation(): ScrollAnimationHookReturn {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsVisible(true)
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      },
    )

    const node = ref.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [])

  return [ref, isVisible]
}

type ScrollAnimatedCardProps = {
  children: React.ReactNode
  delay?: number
}

// Scroll Animasyonlu Kart Component'i
function ScrollAnimatedCard({ children, delay = 0 }: ScrollAnimatedCardProps) {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Profil Fotoğrafı Component'i
function ProfileImage() {
  const [imageError, setImageError] = useState(false)
  const imageSrc = profileImage

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="w-full h-64 md:h-80 rounded-2xl relative overflow-hidden group shadow-lg border-2 border-orange-200/30">
      {!imageError ? (
        <img
          src={imageSrc}
          alt="Psikolog Başak Şeref"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        // Placeholder - Fotoğraf yoksa göster
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-100/40 to-rose-100/40 flex items-center justify-center shadow-inner backdrop-blur-sm">
          {/* Görsel overlay efektleri - Subtle */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-300/10 to-orange-300/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Görsel placeholder içeriği */}
          <div className="relative z-10 text-center">
            <div className="text-6xl md:text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              👋
            </div>
            <p className="text-xs md:text-sm text-gray-500 font-light">
              Profil fotoğrafı ekleyin:
              <br />
              <span className="font-medium">src/images/profile.jpg</span>
            </p>
          </div>

          {/* Dekoratif küçük elementler - Çok subtle */}
          <div className="absolute top-6 left-6 w-12 h-12 bg-amber-200/20 rounded-full blur-lg"></div>
          <div className="absolute bottom-6 right-6 w-10 h-10 bg-orange-200/20 rounded-full blur-lg"></div>
        </div>
      )}
    </div>
  )
}

// Hikaye + Görsel Split Layout Bölümü - Modern ve Kibar
function StoryWithImageSection() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Arka plan - Subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-rose-50/20 rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100/20 rounded-full -mr-20 -mt-20 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-100/20 rounded-full -ml-18 -mb-18 blur-2xl"></div>

      <div className="relative z-10 bg-white/70 backdrop-blur-sm rounded-3xl border border-orange-100/50 shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Metin Tarafı - Sol - Modern ve Kibar */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white/50">
            {/* Başlık - Zarif */}
            <div className="mb-6">
              <div className="inline-block mb-3">
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Ben Kimim?
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
              <p className="font-light">
                BAKÜ Devlet Üniversitesi'nde psikoloji eğitimi aldım. Ama aslında bu
                yolculuk çok daha önce, insanları anlamaya çalıştığım çocukluk yıllarımda
                başladı.
              </p>

              {/* Quote - Modern card */}
              <div className="relative pl-6 border-l-4 border-orange-400">
                <div className="absolute -left-3 top-0 text-2xl text-orange-400">
                  "
                </div>
                <p className="text-gray-800 italic font-light text-lg leading-relaxed pl-4">
                  Ben sadece Başak'ım. Sizinle birlikte yürüyen, sizi dinleyen, anlamaya
                  çalışan biriyim.
                </p>
              </div>

              <p className="text-gray-600 font-light">
                <span className="text-orange-600 font-semibold">Herkes kendi hikayesini yazar.</span>{' '}
                Benim görevim, bu hikayeyi birlikte okumak ve gerekirse yeniden yazmanıza
                yardımcı olmak.
              </p>
            </div>
          </div>

          {/* Görsel Tarafı - Sağ - Modern */}
          <div className="bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-rose-50/40 p-8 md:p-10 lg:p-12 flex items-center justify-center relative overflow-hidden">
            {/* Profil fotoğrafı */}
            <ProfileImage />
          </div>
        </div>
      </div>
    </div>
  )
}

type MasonryItem = {
  emoji: string
  quote: string
  gradient: string
  bg: string
  height: string
}

// Hayatımdan - Samimi, Klişe Olmayan Kartlar
function HayatimdanMasonrySection() {
  const items: MasonryItem[] = [
    {
      emoji: '☕',
      quote: 'Sabahları kahvemi yudumlarken düşünürüm: Bugün hayat bana ne verecek?',
      gradient: 'from-orange-400 to-amber-500',
      bg: 'from-orange-50 to-amber-50',
      height: 'md:h-[280px]',
    },
    {
      emoji: '🌱',
      quote: 'Doğada yürüyüş yapmak beni dengeler. Bazen ise sadece gökyüzüne bakmak...',
      gradient: 'from-green-400 to-emerald-500',
      bg: 'from-green-50 to-emerald-50',
      height: 'md:h-[260px]',
    },
    {
      emoji: '💭',
      quote:
        'Ben de zorlanıyorum, kayboluyorum. İnsan olmak bu demek. Mükemmel olmak değil.',
      gradient: 'from-rose-400 to-pink-500',
      bg: 'from-rose-50 to-pink-50',
      height: 'md:h-[300px]',
    },
    {
      emoji: '📖',
      quote:
        'Her danışanımdan bir şey öğreniyorum. Bu mesleği sevmemin en büyük nedenlerinden biri bu.',
      gradient: 'from-amber-400 to-orange-500',
      bg: 'from-amber-50 to-orange-50',
      height: 'md:h-[270px]',
    },
    {
      emoji: '🎨',
      quote:
        'Boş zamanlarımda resim yaparım. Yaratıcılık, duyguları dışa vurmanın en güzel yolu.',
      gradient: 'from-purple-400 to-indigo-500',
      bg: 'from-purple-50 to-indigo-50',
      height: 'md:h-[290px]',
    },
    {
      emoji: '🌅',
      quote:
        'Her gün yeni bir başlangıç. Her sabah yeni bir fırsat. Size de aynısını hatırlatmak istiyorum.',
      gradient: 'from-cyan-400 to-blue-500',
      bg: 'from-cyan-50 to-blue-50',
      height: 'md:h-[310px]',
    },
  ]

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Hayatımdan
        </h2>
      </div>

      {/* Grid Layout - Ana sayfa ile tutarlı */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
        {/* Grid arka plan dekorasyonu */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-rose-50/30 rounded-3xl blur-3xl -z-10 animate-pulse-slow"></div>

        {items.map((item, index) => (
          <ScrollAnimatedCard key={index} delay={index * 100}>
            <div
              className={`bg-gradient-to-br ${item.bg} backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] ${item.height} group relative overflow-hidden transform`}
            >
              {/* Hover efekti için arka plan */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-2xl`}
              ></div>

              {/* Floating arka plan elementi */}
              <div
                className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-15 transition-opacity duration-500 animate-float`}
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="text-6xl md:text-7xl mb-5 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 inline-block">
                  {item.emoji}
                </div>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium italic flex-grow flex items-center">
                  "{item.quote}"
                </p>
              </div>
            </div>
          </ScrollAnimatedCard>
        ))}
      </div>
    </div>
  )
}

type WorkItem = {
  icon: string
  title: string
  description: string
  gradient: string
  bg: string
}

// Nasıl Çalışırım Section Component'i
function NasilCalisirimSection() {
  const items: WorkItem[] = [
    {
      icon: '🎯',
      title: 'Sen Merkezdesin',
      description:
        'Her seans sizin ihtiyaçlarınıza göre şekillenir. Ben sadece rehberlik ederim, yolculuk sizin.',
      gradient: 'from-orange-500 to-amber-500',
      bg: 'from-orange-50 to-amber-50',
    },
    {
      icon: '🤝',
      title: 'Güven ve Saygı',
      description:
        'Burada yargılanmazsınız, eleştirilmezsiniz. Sadece dinlenir, anlaşılır ve kabul edilirsiniz.',
      gradient: 'from-amber-500 to-orange-500',
      bg: 'from-amber-50 to-orange-50',
    },
    {
      icon: '💬',
      title: 'Açık İletişim',
      description:
        "Sorularınız, endişeleriniz, merak ettikleriniz... Hepsini konuşabiliriz. WhatsApp'tan da bana ulaşabilirsiniz.",
      gradient: 'from-rose-500 to-pink-500',
      bg: 'from-rose-50 to-pink-50',
    },
    {
      icon: '🌱',
      title: 'Adım Adım',
      description:
        'Büyük değişiklikler bir gecede olmaz. Birlikte küçük adımlar atarız, her adım bir öncekinden güçlü olur.',
      gradient: 'from-green-500 to-emerald-500',
      bg: 'from-green-50 to-emerald-50',
    },
    {
      icon: '💡',
      title: 'Kişiselleştirilmiş Yaklaşım',
      description:
        'Herkes farklıdır. Bu yüzden her danışanıma özel, onların ihtiyaçlarına uygun bir yol haritası çizeriz.',
      gradient: 'from-purple-500 to-indigo-500',
      bg: 'from-purple-50 to-indigo-50',
    },
    {
      icon: '⏰',
      title: 'Kendi Hızınızda',
      description:
        'Kimse sizi zorlamaz. Hazır olduğunuzda, kendi ritminizde ilerlersiniz. Ben burada destek olmak için varım.',
      gradient: 'from-cyan-500 to-blue-500',
      bg: 'from-cyan-50 to-blue-50',
    },
  ]

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Nasıl Çalışırım?
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Terapi sürecimde önem verdiğim değerler ve yaklaşımım...
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
        {/* Grid arka plan dekorasyonu */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-transparent to-amber-50/40 rounded-3xl blur-3xl -z-10 animate-pulse-slow"></div>

        {items.map((item, index) => (
          <ScrollAnimatedCard key={index} delay={index * 100}>
            <div
              className={`bg-gradient-to-br ${item.bg} backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] group h-full relative overflow-hidden transform`}
            >
              {/* Hover efekti için arka plan */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
              ></div>

              {/* Floating arka plan elementi */}
              <div
                className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500 animate-float`}
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>

              <div className="relative z-10">
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl md:text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          </ScrollAnimatedCard>
        ))}
      </div>
    </div>
  )
}

export default AboutPage

