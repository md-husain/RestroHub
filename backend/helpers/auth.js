const jwt = require("jsonwebtoken");
require("dotenv/config");

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("TOKEN", token)
  if (token === null) {
    return res
      .sendStatus(401)
      .json({ success: false, message: "unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
    if (error) {
      // console.log(error);
      return res.sendStatus(403);
    }
    res.locals = response;
    next();
  });
}

module.exports = { auth: auth };
