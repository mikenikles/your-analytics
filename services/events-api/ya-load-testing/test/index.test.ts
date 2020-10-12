import { expect, test } from "@oclif/test";
import { formatISO, startOfMonth, sub } from "date-fns";
import { inspect } from "util";

import cmd = require("../src");

describe("ya-load-testing", () => {
  test
    .nock("http://localhost:8080", (api) =>
      api
        .post("/", {
          name: "pageview",
          domain: "local-testing.com",
          url: "http://local-testing.com/tests",
          referrer: "http://www.test-referrer.com",
          screen_size: 800,
          timestamp: new Date(2020, 5, 28, 12, 13, 14).toISOString(),
        })
        .reply(201)
    )
    .stdout()
    .do(() => cmd.run([]))
    .it("runs ya-load-testing", (ctx) => {
      const defaultOptions = {
        from: "2020-07-01",
        to: "2020-10-12",
        min: "0",
        max: "50",
        period: "hour",
      };
      expect(ctx.stdout).to.contain(
        `Running load testing with flags: ${inspect(defaultOptions)}`
      );
      expect(ctx.stdout).to.contain("Load testing completed.");
    });

  // test
  //   .stdout()
  //   .do(() => cmd.run(["--name", "jeff"]))
  //   .it("runs hello --name jeff", (ctx) => {
  //     expect(ctx.stdout).to.contain("hello jeff");
  //   });
});
