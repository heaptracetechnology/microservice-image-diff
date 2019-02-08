FROM node:current-alpine

RUN npm install pixelmatch

RUN npm install express

RUN npm install multer

ADD app.js app.js

ENTRYPOINT ["node", "app.js"]