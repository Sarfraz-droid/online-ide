FROM rex1911/compile-code-base:latest
RUN npm install
COPY . /app
WORKDIR /app
CMD  node server.js