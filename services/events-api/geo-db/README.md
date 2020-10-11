# GEO IP updater Cloud Build custom builder

This custom Cloud Build builder updates the GeoLite2-City database.

## Push a new image to the GCP Container Registry

In a terminal, navigate to this directory and run the following command:

```bash
gcloud builds submit --tag gcr.io/your-analytics/maxmind-geoipupdater:latest
```

## Usage in a `cloudbuild.yaml` config file

First, create the following `GeoIP.conf` file:

```
AccountID YOUR_ACCOUNT_ID_HERE
LicenseKey YOUR_LICENSE_KEY_HERE
EditionIDs GeoLite2-City

DatabaseDirectory ./
```

Next, update the `cloudbuild.yaml` with the steps below.
Set the `dir` option to the directory that contains your `GeoIP.conf` file.

```yaml
- name: "bash"
  args: ["./setup-geoip-config-file.sh"]
  dir: "services/events-api/geo-db"
- name: "gcr.io/your-analytics/maxmind-geoipupdater"
  dir: "services/events-api/geo-db"
- name: "bash"
  args: ["test", "-f", "GeoLite2-City.mmdb"]
  dir: "services/events-api/geo-db"
```

Set the following substitutions for your build (either through the Cloud Build UI or the CLI):

- `_MAXMIND_ACCOUNT_ID`
- `_MAXMIND_LICENSE_KEY`
