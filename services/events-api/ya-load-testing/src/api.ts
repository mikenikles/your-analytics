import got from "got";

interface IEvent {
  name: string;
  domain: string;
  url: string;
  referrer: string;
  screen_size: number;
  timestamp: Date;
}

const defaultUserAgent =
  "Mozilla/5.0 (X11; CrOS x86_64 13099.48.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.64 Safari/537.36";

export const sendEvent = (
  event: IEvent,
  apiEndpoint = "http://localhost:8080"
) =>
  got.post(apiEndpoint, {
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "text/plain",
      "User-Agent": defaultUserAgent,
    },
  });
