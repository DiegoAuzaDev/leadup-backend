require("dotenv").config();
const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const auth = require("../models/auth");

require("../utils/passport");

const localRouter = Router();

localRouter.get("/login", (req, res, next) => {
  console.log(req);
});

localRouter.post("/signup", (req, res, next) => {
  const { name, email, password, photo } = req.body;
  const { redirect_url } = req.query;

  req.user = {
    name,
    email,
    password,
    photo,
  };
  if (!name || !email || !password) {
    return next("Missing params");
  }
  const authenticator = passport.authenticate(
    "local-signup",
    (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.redirect(`${redirect_url}?token=${token}`);
      });
    }
  );

  return authenticator(req, res, next);
});




localRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = localRouter;
