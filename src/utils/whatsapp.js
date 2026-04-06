const DEFAULT_MESSAGE =
  'Merhaba, randevu almak istiyorum. Bilgi verebilir misiniz?';

/**
 * VITE_WHATSAPP_NUMBER tanımlıysa wa.me bağlantısı döner (örn. 905551234567).
 */
export function getWhatsAppBookingUrl() {
  const num = import.meta.env?.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') || '';
  if (!num) return null;
  return `https://wa.me/${num}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
}
