FROM node:16-stretch AS builder
LABEL maintainer="datapunt@amsterdam.nl"

WORKDIR /app

COPY . /app

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

# Test 
FROM builder as test
RUN echo "run test"
RUN npm run test

# Build
FROM builder as build
RUN echo "run build"
RUN GENERATE_SOURCEMAP=false npm run build

# Deploy
FROM nginx:stable-alpine
COPY --from=build /app/build/. /var/www/html/

COPY default.conf /etc/nginx/conf.d/