FROM node:16-stretch AS builder

LABEL maintainer="datapunt@amsterdam.nl"

EXPOSE 80

WORKDIR /app

COPY package.json \
  package-lock.json \
  .eslintrc.js \
  .gitignore \
  /app/

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:


# Install NPM dependencies.
RUN npm --production=false --unsafe-perm ci && \
  npm cache clean --force

COPY . /app

# Build
RUN echo "run build"
RUN npm run build

# Deploy
FROM nginx:stable-alpine
COPY --from=builder /app/build/. /var/www/html/

COPY default.conf /etc/nginx/conf.d/