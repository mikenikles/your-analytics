# db-analytics

## Host

A VM on GCE as part of the POC.

**TODO**: Migrate to a Zookeeper, multi-node, HA environment for production.

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

Call with `sh ./2-create-db-and-tables.sh [PASSWORD]`

`2-create-db-and-tables.sh`
```bash
#!/bin/bash

clickhouse-client --password $1 --query "CREATE DATABASE IF NOT EXISTS youranalytics"

TABLE_EVENTS=$(cat << EOM
  CREATE TABLE IF NOT EXISTS youranalytics.events (
      timestamp DateTime,
      name String,
      domain String,
      user_id UInt64,
      session_id UInt64,
      hostname String,
      path String,
      referrer String,
      country_code LowCardinality(FixedString(2)),
      screen_size LowCardinality(String),
      operating_system LowCardinality(String),
      browser LowCardinality(String)
    ) ENGINE = MergeTree()
    PARTITION BY toYYYYMM(timestamp)
    ORDER BY (name, domain, user_id, timestamp)
    SETTINGS index_granularity = 8192
EOM
)

clickhouse-client --password $1 --query "$TABLE_EVENTS"
```