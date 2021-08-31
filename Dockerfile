FROM node:9-slim
RUN npm install
COPY . /app
WORKDIR /app
CMD  node server.js