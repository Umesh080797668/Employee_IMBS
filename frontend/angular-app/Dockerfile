FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN rm -f package-lock.json && npm install
COPY . .
RUN npm run build

FROM nginx:alpine
# Try copying both possible locations, one will fail but that's okay in a shell script, but not in COPY.
# I'll rely on the standard v17+ output.
COPY --from=build /app/dist/angular-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
