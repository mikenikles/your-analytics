# events-api

Processes incoming events. In the initial phase, these events are sent from the `ya.js` file embedded in websites.

## Send a test event

```
curl -v -X POST -H "Content-Type: text/plain" -H "user-agent:Mozilla/5.0 (X11; CrOS x86_64 13099.48.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.64 Safari/537.36" -d @./test-event.json "http://localhost:8080"
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
