import React, { useState } from 'react'

function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappNumber = '+905060635312'
  const whatsappMessage = encodeURIComponent(
    'Merhaba, randevu almak istiyorum. Bilgi verebilir misiniz?',
  )

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : '#'

  return (
    <div className="fixed bottom-8 right-4 z-50">
      {isOpen && (
        <div className="mb-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg w-72 sm:w-80 max-w-[calc(100vw-5rem)] border border-gray-200/50 overflow-hidden transform transition-all duration-300 ease-out origin-bottom-right">
          <div className="bg-gradient-to-r from-green-500/90 to-green-600/90 backdrop-blur-sm text-white p-3 flex items-center justify-between relative">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-9 h-9 bg-white/25 rounded-full flex items-center justify-center shadow-md ring-1 ring-white/30 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm truncate">Psk. Başak Şeref</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></div>
                  <p className="text-xs text-white/90 truncate">Çevrimiçi</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200 p-1.5 rounded-full flex-shrink-0 ml-2"
              aria-label="Kapat"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-3.5 bg-white/80 backdrop-blur-sm">
            <div className="mb-3">
              <div className="bg-white/90 rounded-xl rounded-tl-none p-3 shadow-sm border border-gray-100/50 relative backdrop-blur-sm">
                <p className="text-xs text-gray-800 leading-relaxed mb-1.5">
                  Merhaba. Randevu almak veya sorularınız için WhatsApp'tan
                  yazabilirsiniz.
                </p>
                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white/90 border-l border-b border-gray-100/50 transform rotate-45"></div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!whatsappNumber) e.preventDefault()
              }}
              aria-disabled={!whatsappNumber}
              className={`group relative block w-full text-white text-center py-2.5 px-4 rounded-xl font-semibold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 transform ${
                whatsappNumber
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-400 cursor-not-allowed opacity-80'
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="text-sm">
                {whatsappNumber ? 'Mesaj Gönder' : 'WhatsApp numarası tanımlı değil'}
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 group">
        {!isOpen && (
          <div className="hidden md:block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full shadow-sm font-medium text-xs whitespace-nowrap border border-gray-200/50">
            WhatsApp ile iletişim için tıklayın
          </div>
        )}

        <div className="relative">
          {!isOpen && (
            <>
              <div className="absolute inset-0 bg-green-400 rounded-full opacity-12 animate-pulse-slow"></div>
              <div
                className="absolute inset-0 bg-green-300 rounded-full opacity-18 animate-pulse-slow"
                style={{ animationDelay: '1.2s' }}
              ></div>
            </>
          )}

          <button
            onClick={() => setIsOpen((v) => !v)}
            className="relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 sm:p-5 shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center ring-4 ring-green-500/40 hover:ring-green-500/60 z-10"
            aria-label="WhatsApp widget'ını aç"
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppWidget

