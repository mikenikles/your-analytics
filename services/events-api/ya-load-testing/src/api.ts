import got from "got";

export interface IEvent {
  name: string;
  domain: string;
  url: string;
  referrer: string;
  screen_size: number;
  timestamp: Date;
}

const defaultUserAgent =
  "Mozilla/5.0 (Linux; Android 7.1.1; SM-T555 Build/NMF26X; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.96 Safari/537.36";

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
