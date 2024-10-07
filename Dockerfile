# Build Stage
FROM node:20-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm install

# Copy all the source code
COPY . ./

# Build the app
RUN npm run app

# Production Stage
FROM node:20-alpine as production

# Copy built frontend files to NGINX
COPY --from=build /app/frontend/dist /var/www/html/

# Copy backend code
COPY --from=build /app /app

# Expose port 80 for NGINX
EXPOSE 80

# Start the backend and NGINX
CMD sh -c "npm run start:backend & nginx -g 'daemon off;'"