FROM nginx:latest
MAINTAINER datapunt.ois@amsterdam.nl

EXPOSE 80

RUN mkdir /app

COPY default.conf /etc/nginx/conf.d/
COPY app /app/
