FROM ubuntu

RUN sudo add-apt-repository ppa:maxmind/ppa \
  && sudo apt-get update -q \
  && sudo apt-get install -yq \
    geoipupdate \
  && sudo rm -rf /var/lib/apt/lists/*

CMD /usr/local/bin/geoipupdate --config-file ./GeoIP.conf