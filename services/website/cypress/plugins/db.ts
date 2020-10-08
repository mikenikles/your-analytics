import * as http from "http";

const tasks = {
  async "db:reset"() {
    return new Promise((resolve, reject) => {
      const callback = (res) => {
        res.on("error", () => {
          reject(null);
        });

        res.on("data", () => {});

        res.on("end", () => {
          resolve(null);
        });
      };
      http
        .request(
          {
            host: "localhost",
            method: "POST",
            path: "/api/admin/tests/db-reset",
            port: 3000,
          },
          callback
        )
        .end();
    });
  },
};

export default (on, config) => {
  on("task", tasks);
  return config;
};
