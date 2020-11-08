import fetch from "node-fetch";

const tasks = {
  async "db:reset"() {
    await fetch("http://localhost:3000/api/admin/tests/db-reset", {
      method: "POST",
    });
    return {};
  },
};

export default (on, config) => {
  on("task", tasks);
  return config;
};
