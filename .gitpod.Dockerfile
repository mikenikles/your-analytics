FROM gitpod/workspace-full

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/

RUN brew install gh

RUN sudo apt-key adv --keyserver keyserver.ubuntu.com --recv E0C56BD4 \
  && echo "deb http://repo.yandex.ru/clickhouse/deb/stable/ main/" | sudo tee /etc/apt/sources.list.d/clickhouse.list \
  && echo "debconf debconf/frontend select Noninteractive" | sudo debconf-set-selections \
  && sudo apt-get update \
  && sudo apt-get install -y clickhouse-server clickhouse-client \
  && sudo rm -rf /var/lib/apt/lists/*
