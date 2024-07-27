FROM node:20-alpine
WORKDIR /app
# RUN apk update && apk add --no-cache gcc g++ openjdk11-jdk python3
RUN apk update && \
    apk add --no-cache gcc g++ openjdk17 python3 && \
    ln -sf /usr/bin/python3 /usr/bin/python && \
    ln -sf /usr/bin/javac /usr/bin/javac

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]


