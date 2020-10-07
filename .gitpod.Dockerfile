FROM gitpod/workspace-full-vnc

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/

RUN brew install gh

RUN sudo apt-key adv --keyserver keyserver.ubuntu.com --recv E0C56BD4 \
  && echo "deb http://repo.yandex.ru/clickhouse/deb/stable/ main/" | sudo tee /etc/apt/sources.list.d/clickhouse.list \
  && sudo apt-get update \
  && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y clickhouse-server clickhouse-client \
  && sudo rm -rf /var/lib/apt/lists/*

# Install Cypress dependencies
RUN sudo apt-get update \
  && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
  && sudo rm -rf /var/lib/apt/lists/*

# Install Firefox
RUN sudo apt-get update -q \
  && sudo apt-get install -yq \
    firefox \
  && sudo rm -rf /var/lib/apt/lists/*

# Configure domain for localhost testing (needed to make cookies work)
RUN sudo echo "127.0.0.1 localhost.your-analytics.org" >> /etc/hosts
