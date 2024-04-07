"use strict";
require("dotenv").config();
const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../utils/errors");

require("../utils/passport");

const authRouter = Router();

// this redirects to google
authRouter.get("/google", (req, res, next) => {
  // get the redirect_url from the query params
  // expecting the url to look like /auth/google?redirect_url=http://localhost:3000/
  const { redirect_url } = req.query;
  // add it to the google state
  const authenticator = passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect_url,
  });

  // redirect to google.
  return authenticator(req, res, next);
});

// google sends response to this
authRouter.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // get the state from the query params
    const { state } = req.query;
    // define the redirectUrl with a fallback if undefined
    const redirectUrl = state ?? "/api/";

    // generate the token and get user id
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    console.log("Token     " + token);

    // redirect with the token
    res.redirect(`${redirectUrl}?token=${token}`);
  }
);


authRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const { redirect_url } = req.query;
  req.user = {
    email,
    password,
  };
  if (!email || !password) {
    return next(new BadRequestError("Missing params"));
  }
  const authenticator = passport.authenticate("local-login", (err, user) => {
    if (err) {
      return next(err);
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.redirect(`${redirect_url}?token=${token}`);
    });
  });
   return authenticator(req, res, next);
});
authRouter.post("/signup", (req, res, next) => {
  const { name, email, password } = req.body;
  const { redirect_url } = req.query;

  req.user = {
    name,
    email,
    password,
  };
  if (!name || !email || !password) {
    return next(new BadRequestError("Missing params"));
  }
  const authenticator = passport.authenticate("local-signup", (err, user) => {
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
  });

  return authenticator(req, res, next);
});

authRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = authRouter;
