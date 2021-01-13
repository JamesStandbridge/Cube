FROM php:7.4-apache

RUN apt-get update && apt-get install -y gnupg2
RUN apt-get update && \
    apt-get install -y libpq-dev g++ zlib1g-dev libicu-dev vim git zip

#GD
RUN apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  libfreetype6-dev \
  libjpeg62-turbo-dev \
  libpng-dev \
  libzip-dev \
  poppler-utils

RUN rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
  docker-php-ext-install -j "$(nproc)" gd pdo_pgsql

RUN docker-php-ext-configure intl
RUN docker-php-ext-install pdo pdo_mysql intl zip opcache

RUN pecl install redis && echo "extension=redis.so" > /usr/local/etc/php/conf.d/docker-php-ext-redis.ini

RUN a2enmod rewrite

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn
