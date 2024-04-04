# Stage 1: Build the React application
FROM node:20 AS build

WORKDIR /myClient

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built React application using Nginx
FROM nginx:alpine

COPY --from=build /myClient/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
