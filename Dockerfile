FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_BASE_URL=
ARG VITE_WHATSAPP_NUMBER=
ARG VITE_SENTRY_DSN=

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_WHATSAPP_NUMBER=$VITE_WHATSAPP_NUMBER
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
