
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm install -g @angular/cli
RUN ng build --configuration production

FROM nginx:stable-alpine as final

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/sleep_tracker/browser /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


