FROM nginx:alpine
RUN mkdir /app
COPY ./dist /app
COPY nginx.conf /etc/nginx/nginx.conf