FROM ubuntu

RUN apt-get update -q \
  && apt-get install -yq software-properties-common \
  && add-apt-repository ppa:maxmind/ppa \
  && apt-get install -yq \
    geoipupdate \
  && rm -rf /var/lib/apt/lists/*

CMD geoipupdate --config-file ./GeoIP.conf