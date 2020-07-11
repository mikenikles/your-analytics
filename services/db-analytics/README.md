# db-analytics

## Host

A VM on GCE as part of the POC.

**TODO**: Migrate to a Zookeeper, multi-node, HA environment for production.

## Local development

There are a number of `dev:docker:*` NPM scripts to assist with local development. Mainly,
the following are important:
* `npm run dev:docker:build`
* `npm run dev:docker:start`
* `npm run dev:docker:clean`

The database is seeded with all SQL scripts located in `dev/sql`.

## Ubuntu 18.04 installation instructions

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-clickhouse-on-ubuntu-18-04

### Installation script

`1-install-clickhouse.sh`
```bash
#!/bin/bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv E0C56BD4

echo "deb http://repo.yandex.ru/clickhouse/deb/stable/ main/" | sudo tee /etc/apt/sources.list.d/clickhouse.list

sudo apt-get update

sudo apt-get install -y clickhouse-server clickhouse-client
```

### DB & tables creation script

Please refer to the `dev/sql` scripts.