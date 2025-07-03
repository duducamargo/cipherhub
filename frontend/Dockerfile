FROM node:20-slim AS frontend_builder 

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:20-slim

RUN npm install -g serve

WORKDIR /app

COPY --from=frontend_builder /app/dist ./ 

EXPOSE 5173

CMD ["serve", "-s", ".", "-l", "5173"]