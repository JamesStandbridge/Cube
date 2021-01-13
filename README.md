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
docker-compose exec application php bin/console doctrine:schema:update
```
