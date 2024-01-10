const jwt = require("jsonwebtoken");

const JWT_SECRET = "blablabla";

exports.getUser = (req, res) => {
  if (!req.headers.authorization) {
    return null;
  }

  const data = jwt.decode(req.headers.authorization, JWT_SECRET);

  if (!data) {
    return res.status(401).send("user not authorized");
  }
  return data.user;
};

exports.JWT_SECRET = JWT_SECRET;
