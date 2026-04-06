# Frontend (React + Vite)

Monoreponun ana site klasörü. Üst dizin: [../README.md](../README.md).

## Kurulum

```bash
cd frontend
npm install
npm run dev
```

## Ortam değişkenleri

- **`VITE_WHATSAPP_NUMBER`** — WhatsApp `wa.me` için (ülke kodlu, boşluksuz, örn. `905551234567`).
- **`VITE_API_BASE_URL`** — İsteğe bağlı; yalnızca backend’e istek atacaksanız (`../backend`).

Ayrıntılar: [ENV_SETUP.md](./ENV_SETUP.md)

## Derleme

```bash
npm run build
```

Vercel’de proje **Root Directory** olarak `frontend` seçilmelidir.
