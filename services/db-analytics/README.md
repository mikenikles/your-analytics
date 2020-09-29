# db-analytics

## Host

A VM on GCE as part of the POC.

**TODO**: Migrate to a Zookeeper, multi-node, HA environment for production.

## Local development

There are a number of `dev:docker:*` NPM scripts to assist with local development. Mainly,
the following are important:

- `npm run dev:docker:build`
- `npm run dev:docker:start`
- `npm run dev:docker:clean`

The database is seeded with all SQL scripts located in `dev/sql`.

## Transfer prod data to local DB

1. Replace `[DB_NAME]` in all commands below with the correct DB name depending on which domain events you want to export
1. On prod: `clickhouse-client --password <PASSWORD> --query="SELECT * FROM [DB_NAME].events FORMAT Native" > events.native`
1. Download `events.native`
1. Upload `events.native` to GCP shell
1. In GCP shell
   1. Start DB
   1. Run: `cat ~/events.native | curl 'http://localhost:8123/?query=INSERT%20INTO%20[DB_NAME].events%20FORMAT%20Native' --data-binary @-`

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

Each domain has its own database, with at least an `events` table. This is created at runtime
when a new domain is configured.
