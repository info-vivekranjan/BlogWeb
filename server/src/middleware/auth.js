const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "Auth token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, "TodoToken123");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
