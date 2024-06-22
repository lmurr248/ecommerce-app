const jwt = require("jsonwebtoken");
const config = require("./config");

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

module.exports = { getToken };
