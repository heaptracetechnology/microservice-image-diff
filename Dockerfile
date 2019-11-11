FROM        node:10-alpine
RUN         mkdir /app
RUN         mkdir /uploads
#RUN         chmod 755 /app/uploads
ADD         package.json package-lock.json /app/
RUN         npm install --prefix /app
COPY        src /app/src

EXPOSE 3000

CMD [ "npm", "start" ]