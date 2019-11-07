FROM node:10.17-slim

WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

RUN npm install -g http-server && npm install

ENV VUE_APP_MAIN_API localhost:8080

COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]
