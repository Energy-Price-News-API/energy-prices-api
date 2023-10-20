FROM node:16-alpine
RUN mkdir home/energy-prices-api
WORKDIR /home/energy-prices-api
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "node", "app.js" ]