# query-api

Provides a query interface to the analytics database.

## Endpoints

See the `src/index.js` file for all available API endpoints.

## Country code to name mapping (`src/clickhouse/world-map/code-name-map.json`)

Navigate to https://www.iban.com/country-codes and run the following code in the dev console:

```js
copy(
  Array.from($("#myTable tbody tr")).reduce((result, tr) => {
    result[tr.children[1].innerHTML] = tr.children[0].innerHTML
      .replace(" (the)", "")
      .replace("Russian Federation", "Russia")
      .replace(" of Great Britain and Northern Ireland", "")
      .replace("Korea (the Democratic People's Republic of)", "North Korea")
      .replace("Korea (the Republic of)", "South Korea")
      .replace("Virgin Islands (British)", "British Virgin Is.")
      .replace("Virgin Islands (U.S.)", "U.S. Virgin Is.")
      .replace("Taiwan (Province of China)", "Taiwan")
      .replace("Venezuela (Bolivarian Republic of)", "Venezuela")
      .replace("Dominican Republic", "Dominican Rep.")
      .replace("Bosnia and Herzegovina", "Bosnia and Herz.")
      .replace("Tanzania, United Republic of", "Tanzania")
      .replace("Lao People's Democratic Republic", "Laos");
    return result;
  }, {})
);
```

## Serverless VPC Access

https://cloud.google.com/vpc/docs/configure-serverless-vpc-access#gcloud

```bash
gcloud services enable vpcaccess.googleapis.com
gcloud compute networks vpc-access connectors create [CONNECTOR_NAME] \
--network [VPC_NETWORK] \
--region [REGION] \
--range [IP_RANGE]
```
