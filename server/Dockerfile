FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Update and install necessary packages
RUN apk update && apk add --no-cache \
    gcc \
    g++ \
    openjdk11-jdk \
    python3 \
    python3-dev \
    py3-pip \
    bash \
    make \
    cmake \
    && rm -rf /var/cache/apk/*

# Copy package.json and package-lock.json if available, and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
