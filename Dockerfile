FROM ghcr.io/puppeteer/puppeteer:21.0.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN rm -rf node_modules rm -f package-lock.json npm cache clean --force npm ci

COPY . .
CMD [ "node", "index.js" ]

