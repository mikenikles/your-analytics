const {
  createUser,
  updateUser,
  deleteUser,
  findUser,
  findUserWithAllData,
  setLastLoginAt,
  addNewWebsiteServerKey,
  getDomainServerKeySecret,
} = require("./users");

module.exports = (serverClient) => ({
  users: {
    create: createUser(serverClient),
    update: updateUser(serverClient),
    delete: deleteUser(serverClient),
    find: findUser(serverClient),
    findUserWithAllData: findUserWithAllData(serverClient),
    setLastLoginAt: setLastLoginAt(serverClient),
    addNewWebsiteServerKey: addNewWebsiteServerKey(serverClient),
    getDomainServerKeySecret: getDomainServerKeySecret(serverClient),
  },
});
