#!/bin/bash

mkdir -p config/jwt

read -s -p "JWT_PASSPHRASE (same value as in .env, default: admin): " password
echo
openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096 -pass pass:$password
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout -passin pass:$password
chown -R 1000:1000 config/jwt
chmod +r config/jwt/private.pem

if [ ${ENV} = "DEV" ]; then
    composer install
else
    composer install --no-dev
fi

php bin/console doctrine:database:create
php bin/console doctrine:schema:create

if [ ${ENV} = "DEV" ]; then
    php bin/console hautelook:fixtures:load
fi

yarn
yarn encore dev
