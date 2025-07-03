FROM node:20-slim AS build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci --legacy-peer-deps

COPY frontend/ ./
RUN npm run build

FROM node:20-slim

RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/dist .

EXPOSE 5173

CMD ["serve", "-s", ".", "-l", "5173"]
