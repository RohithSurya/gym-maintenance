const jwt = require("jsonwebtoken");
const config = require("../../config.json");

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) res.status(401).json("Unauthorized: no token.");

  try {
    const token = authorization.split(" ").pop();
    const verified = jwt.verify(token, config.jwtsecret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid Token" });
  }
};

module.exports = { verifyToken };
