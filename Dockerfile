FROM node:16

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies using npm install (not npm ci)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "server/server.js"]
