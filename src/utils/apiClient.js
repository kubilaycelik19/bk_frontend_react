// src/utils/apiClient.js
// Merkezi API istemcisi - Tüm API çağrıları için tutarlı hata yönetimi

import axios from 'axios';

const API_BASE_URL = 'https://bk-api-evsk.onrender.com';

// Axios instance oluştur
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 saniye timeout
});

// Request Interceptor - Her istekten önce çalışır
apiClient.interceptors.request.use(
  (config) => {
    // Token varsa header'a ekle
    const token = localStorage.getItem('accessToken') || 
                  (typeof window !== 'undefined' && window.__authToken__);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Her yanıttan sonra çalışır
apiClient.interceptors.response.use(
  (response) => {
    // Başarılı yanıtları olduğu gibi döndür
    return response;
  },
  (error) => {
    // Hata yakalama ve işleme
    const originalRequest = error.config;

    // Network hatası (sunucuya ulaşılamıyor)
    if (!error.response) {
      const networkError = {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.',
          detail: error.message || 'Bağlantı hatası'
        }
      };
      return Promise.reject(networkError);
    }

    const status = error.response.status;
    const data = error.response.data;

    // 401 Unauthorized - Token süresi dolmuş veya geçersiz
    if (status === 401) {
      // Token'ı temizle
      localStorage.removeItem('accessToken');
      if (typeof window !== 'undefined') {
        window.__authToken__ = null;
      }

      // Eğer login sayfasında değilsek, login sayfasına yönlendir
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        // Sadece bir kez yönlendirme yap
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          window.location.href = '/login?expired=true';
        }
      }

      return Promise.reject({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: data?.error?.message || 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
          detail: data?.error?.detail || null
        }
      });
    }

    // 403 Forbidden - Yetki yok
    if (status === 403) {
      return Promise.reject({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: data?.error?.message || 'Bu işlem için yetkiniz bulunmamaktadır.',
          detail: data?.error?.detail || null
        }
      });
    }

    // 404 Not Found
    if (status === 404) {
      return Promise.reject({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: data?.error?.message || 'İstenen kaynak bulunamadı.',
          detail: data?.error?.detail || null
        }
      });
    }

    // 422 Validation Error veya 400 Bad Request
    if (status === 400 || status === 422) {
      // Backend'den gelen hata formatı
      if (data?.error) {
        return Promise.reject({
          success: false,
          error: data.error
        });
      }
      
      // Eski format (sadece detail var)
      return Promise.reject({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: data?.detail || 'Geçersiz veri. Lütfen gönderdiğiniz bilgileri kontrol edin.',
          detail: data
        }
      });
    }

    // 500 Internal Server Error
    if (status >= 500) {
      return Promise.reject({
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: data?.error?.message || 'Sunucuda bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
          detail: data?.error?.detail || null
        }
      });
    }

    // Diğer hatalar için backend'den gelen formatı kullan
    if (data?.error) {
      return Promise.reject({
        success: false,
        error: data.error
      });
    }

    // Fallback - Bilinmeyen hata formatı
    return Promise.reject({
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'Beklenmeyen bir hata oluştu.',
        detail: data || error.message
      }
    });
  }
);

export default apiClient;
export { API_BASE_URL };

