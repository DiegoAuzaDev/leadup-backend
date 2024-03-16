const { UnauthorizedError } = require("../utils/errors");

const debug = require("debug")("app:isAuthenticated");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");



const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return next(new UnauthorizedError("Please sign in"));
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);
    if (!user) return next(new UnauthorizedError("Please sign in"));
    req.user = user;

    return next();
  } catch (error) {
    next(new UnauthorizedError(`JWT error: ${error.message}`));
  }
};


module.exports = isAuthenticated;
