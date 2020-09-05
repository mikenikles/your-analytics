const {
  createUser,
  findUser,
  setFirstName,
  setLastLoginAt,
  addNewWebsiteServerKey,
} = require("./users");

module.exports = (serverClient) => ({
  users: {
    create: createUser(serverClient),
    find: findUser(serverClient),
    setFirstName: setFirstName(serverClient),
    setLastLoginAt: setLastLoginAt(serverClient),
    addNewWebsiteServerKey: addNewWebsiteServerKey(serverClient),
  },
});
