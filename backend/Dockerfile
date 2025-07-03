FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential libc6 libstdc++6 zlib1g \
    && apt-get upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . . 

WORKDIR /app/src/

RUN mkdir -p output \
    && gcc base64.c -o output/base64 \
    && gcc rsa.c -o output/rsa -std=gnu99 -lm \
    && gcc sha256.c -o output/sha256

WORKDIR /app

EXPOSE 3001

CMD ["node", "server.js"]