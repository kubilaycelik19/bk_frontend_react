# BK Frontend React

React + Vite + Tailwind CSS frontend application for BK Project.

## Environment Setup

**Important:** Environment variables setup is required for both local development and production.

### Local Development

1. Create `.env.local` file in the root directory:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_WHATSAPP_NUMBER=905551234567
```

2. Install dependencies and start dev server:
```bash
npm install
npm run dev
```

### Production

For production deployment (Vercel/Render), set the environment variables:
- **Key**: `VITE_API_BASE_URL`
  **Value**: `https://bk-api-evsk.onrender.com`
- **Key**: `VITE_WHATSAPP_NUMBER`
  **Value**: `905551234567` (Country code included, no spaces)

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed setup instructions.

## How It Works

- **Local Development**: Uses `.env.local` file → `http://127.0.0.1:8000`
- **Production**: Uses environment variables → `https://bk-api-evsk.onrender.com`
- **Fallback**: If no environment variable is set, defaults to production URL for API
- **WhatsApp**: If `VITE_WHATSAPP_NUMBER` is not set, the WhatsApp section will not be displayed

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```
