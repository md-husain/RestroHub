require("dotenv/config");

function checkRole(req, res, next) {
  if (res.locals.role === "user") {
    return res.statusCode(401);
  }
  next();
}

module.exports = { checkRole: checkRole };
