const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token, authentication denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user[0].user_id;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ msg: "Token Not Valid" });
  }
};

module.exports = auth;
