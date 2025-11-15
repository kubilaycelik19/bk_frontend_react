# Environment Variables Setup

## Local Development

1. `.env.local` dosyasını oluşturun (zaten oluşturulmuş olmalı):
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_WHATSAPP_NUMBER=905551234567
```

**Not**: `VITE_WHATSAPP_NUMBER` formatı: Ülke kodu ile birlikte, boşluksuz (örn: 905551234567)

2. Frontend'i başlatın:
```bash
npm run dev
```

## Production (Vercel)

1. Vercel Dashboard'a gidin
2. Projenizi seçin
3. **Settings** → **Environment Variables** bölümüne gidin
4. Yeni environment variable'ları ekleyin:
   - **Key**: `VITE_API_BASE_URL`
     **Value**: `https://bk-api-evsk.onrender.com`
     **Environment**: Production, Preview, Development (tümüne ekleyin)
   
   - **Key**: `VITE_WHATSAPP_NUMBER`
     **Value**: `905551234567` (Ülke kodu ile birlikte, boşluksuz)
     **Environment**: Production, Preview, Development (tümüne ekleyin)

5. Deploy'u yeniden yapın (environment variable değişiklikleri için gerekli)

## Production (Render)

1. Render Dashboard'a gidin
2. Frontend servisinizi seçin
3. **Environment** sekmesine gidin
4. Yeni environment variable'ları ekleyin:
   - **Key**: `VITE_API_BASE_URL`
     **Value**: `https://bk-api-evsk.onrender.com`
   
   - **Key**: `VITE_WHATSAPP_NUMBER`
     **Value**: `905551234567` (Ülke kodu ile birlikte, boşluksuz)

5. Servisi yeniden deploy edin

## Notlar

- `.env.local` dosyası git'te saklanmaz (`.gitignore`'da)
- Production'da environment variable set edilmezse:
  - `VITE_API_BASE_URL` için fallback: `https://bk-api-evsk.onrender.com`
  - `VITE_WHATSAPP_NUMBER` set edilmezse WhatsApp bölümü gösterilmez
- Environment variable değişikliklerinden sonra frontend'i yeniden build etmeniz gerekir
- WhatsApp numarası formatı: Ülke kodu ile birlikte, boşluksuz (örn: Türkiye için `905551234567`)

