# query-api

Provides a query interface to the analytics database.

## Endpoints

See the `src/index.js` file for all available API endpoints.

## Serverless VPC Access

https://cloud.google.com/vpc/docs/configure-serverless-vpc-access#gcloud

```bash
gcloud services enable vpcaccess.googleapis.com
gcloud compute networks vpc-access connectors create [CONNECTOR_NAME] \
--network [VPC_NETWORK] \
--region [REGION] \
--range [IP_RANGE]
```
