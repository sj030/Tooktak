FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
# Copy the rest of your app's source code from your host to your app directory
COPY ../../Desktop .

# Build the app
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outer world
EXPOSE 80

# Start nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
