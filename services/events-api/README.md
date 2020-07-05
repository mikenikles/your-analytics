# events-api

Processes incoming events. In the initial phase, these events are sent from the `ya.js` file embedded in websites.

## Send a test event

```
curl -v -X POST -H "Content-Type: application/json" -d @./test-event.json "https://[URL]"
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