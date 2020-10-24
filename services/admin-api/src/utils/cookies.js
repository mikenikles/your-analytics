const jwt = require("jsonwebtoken");

const cookieConfig = {
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: true,
};

const signJwtAndSetCookie = (res, user) =>
  new Promise((resolve, reject) => {
    jwt.sign({ user }, process.env.JWT_SECRET, (error, token) => {
      if (error) {
        console.error(error);
        reject();
      }
      res.cookie("jwt", token, cookieConfig);
      resolve();
    });
  });

module.exports = {
  cookieConfig,
  signJwtAndSetCookie,
};
