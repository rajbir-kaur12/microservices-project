FROM node:18-alpine

# Create and set app directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies as root (required for write access initially)
RUN npm install

# Copy the rest of the app
COPY . .

# Change ownership of the app directory to 'node' user
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Expose port
EXPOSE 3003

# Start the application
CMD ["npm", "start"]

