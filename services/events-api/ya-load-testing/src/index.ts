import { Command, flags } from "@oclif/command";
import { formatISO, startOfMonth, sub } from "date-fns";
import got from "got";

class YaLoadTesting extends Command {
  static description = "describe the command here";

  static flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    from: flags.string({
      char: "f",
      default: () =>
        formatISO(
          startOfMonth(
            sub(new Date(), {
              months: 3,
            })
          ),
          { representation: "date" }
        ),
      description: "",
    }),
    to: flags.string({
      char: "t",
      default: () => formatISO(new Date(), { representation: "date" }),
      description: "",
    }),
    min: flags.string({
      default: "0",
      description: "",
    }),
    max: flags.string({
      default: "50",
      description: "",
    }),
    period: flags.string({
      char: "p",
      default: "hour",
      description: "",
      options: ["hour", "day", "month"],
    }),
  };

  async run() {
    const { flags } = this.parse(YaLoadTesting);

    this.log(`Running load testing with flags: %o`, flags);

    await got.post("http://localhost:8080", {
      body: JSON.stringify({
        name: "pageview",
        domain: "local-testing.com",
        url: "http://local-testing.com/tests",
        referrer: "http://www.test-referrer.com",
        screen_size: 800,
        timestamp: new Date(2020, 5, 28, 12, 13, 14),
      }),
      headers: {
        "Content-Type": "text/plain",
        "User-Agent":
          "Mozilla/5.0 (X11; CrOS x86_64 13099.48.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.64 Safari/537.36",
      },
    });
    this.log("Load testing completed.");
  }
}

export = YaLoadTesting;
