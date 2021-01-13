# Boeki Bootstrap Application

## Requirements

- Docker
- Docker-compose

## Installation

```
# Fetch project

git clone {repositoryname} {directory}
cd {directory}

# Configure docker

cp docker/docker-compose.dev.yaml.dist docker/docker-compose.dev.yaml
# Accorting to your OS and preferences, you can edit this file

# Launch project

docker-compose up -d

```
Then you can access to your database through a postgresl client with:

host: 127.0.0.1
port: 5432
login: postgres
password: root

Or easier, a phppgadmin is already integrated here: http://127.0.0.1:8001 with same login/password.

```
# Install application dependencies
docker-compose exec application composer install --dev
```

Application is now available on http://127.0.0.1:8000

## Database creation

```
docker-compose exec application php bin/console doctrine:database:create
docker-compose exec application php bin/console doctrine:schema:create

docker-compose exec application php bin/console doctrine:query:sql "$(cat data/sql/partitionned_stock_move.sql)"
```

## Database update


```
docker-compose exec application php bin/console doctrine:schema:update --dump-sql
```

You need to get only lines concerned by your changes.

## Capistrano deployment

It uses capistrano & capistrano-symfony, see [capistrano installation](https://capistranorb.com/documentation/getting-started/installation/) and [capistrano symfony installation](https://github.com/capistrano/symfony)

```
cap preprod deploy
```

## Set Dev environment on remote pprod server

```
# edit .env and set
APP_ENV=dev
APP_DEBUG=true

composer install --dev

# don't forget to append --env=dev at each bin/console commands
bin/console --env=dev { .... }
```

Don't forget, come back to PROD environment

```
# edit .env and set
APP_ENV=prod
APP_DEBUG=false

composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader
```

