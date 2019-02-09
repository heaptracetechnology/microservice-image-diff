FROM node:current-alpine
COPY . .
#RUN ls -la ./uploads/*
RUN chmod 755 /uploads
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]