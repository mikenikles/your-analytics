import { Command, flags } from "@oclif/command";
import {
  formatDistanceToNowStrict,
  formatISO,
  parseISO,
  startOfMonth,
  sub,
} from "date-fns";
import { performLoadTesting } from "./load-testing";

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
      description: "The first day for which to generate events.",
    }),
    to: flags.string({
      char: "t",
      default: () => formatISO(new Date(), { representation: "date" }),
      description: "The last day (inclusive) for which to generate events.",
    }),
    min: flags.string({
      default: "0",
      description: "The minimum number of events to create for a given period.",
    }),
    max: flags.string({
      default: "50",
      description: "The maximum number of events to create for a given period.",
    }),
    period: flags.string({
      char: "p",
      default: "hour",
      description: "The period for which the min/max flags apply.",
      options: ["hour", "day", "month"],
    }),
    domain: flags.string({
      char: "d",
      default: "local-testing.com",
      description: "The domain name for which to create events.",
    }),
  };

  async run() {
    const start = Date.now();
    const { flags } = this.parse(YaLoadTesting);

    this.log(`Running load testing with flags: %o`, flags);
    await performLoadTesting({
      from: parseISO(flags.from),
      to: parseISO(flags.to),
      // @ts-ignore
      min: flags.min * 1,
      // @ts-ignore
      max: flags.max * 1,
      period: flags.period,
      domain: flags.domain,
    });
    this.log("Load testing completed in %s.", formatDistanceToNowStrict(start));
  }
}

export = YaLoadTesting;
