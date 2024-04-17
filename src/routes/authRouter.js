"use strict";

// TODO
// ! Check how to get rid of duplicated sessions token

// Import required modules and middleware
require("dotenv").config();
const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../utils/errors");

// Initialize passport strategies
require("../utils/passport");

// Create router instance
const authRouter = Router();

// Route to initiate Google OAuth2 authentication
authRouter.get("/google", (req, res, next) => {
  // Extract redirect URL from query parameters
  const { redirect_url } = req.query;
  // Configure Google authentication
  const authenticator = passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect_url,
  });
  // Redirect to Google for authentication
  return authenticator(req, res, next);
});

// Callback route for Google OAuth2 authentication
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failWithError: "/api" }),
  (req, res) => {
    // Extract state from query parameters
    const { state } = req.query;
    // Define redirect URL with fallback if undefined
    const redirectUrl = state ?? "/api/";
    // Generate JWT token with user ID
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    if (!token) {
      res.redirect(`${redirectUrl}?error=email%is%already%taken`);
    } 
    // Redirect with token appended to the URL
   if(token){
     res.redirect(`${redirectUrl}?token=${token}`);
   }
  }
);

// Route to handle user login
authRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  const { redirect_url } = req.query ?? "/api/";

  if (!email || !password) {
    return res.status(400).json({ message: "Missing params" });
  }

  passport.authenticate("local-login", (err, user) => {
    if (err) {
      return next(err); // Forward any errors to the error handler
    }
    if (user == 404) {
      // No user found
      return res.status(404).json({ message: "User not found" });
    }
    if (user == 401) {
      // No user found
      return res.status(401).json({ message: "Invalid Credentails" });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err); // Forward any errors to the error handler
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.redirect(`${redirect_url}?token=${token}`);
    });
  })(req, res, next); // Invoke the middleware function returned by passport.authenticate
});

// Route to handle user signup
authRouter.post("/signup", (req, res, next) => {
  // Extract name, email, password, and redirect URL from request body and query parameters
  const { name, email, password } = req.body;
  const { redirect_url } = req.query ?? "/api/";
  // Store user information in request object
  req.user = {
    name,
    email,
    password,
  };
  // Validate presence of name, email, and password
  if (!name || !email || !password) {
    return next(new BadRequestError("Missing params"));
  }
  // Authenticate user with local signup strategy
  const authenticator = passport.authenticate("local-signup", (err, user) => {
    if (err) {
      return next(err);
    }
    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    // Log user in and generate JWT token
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      // Redirect with token appended to the URL
      res.redirect(`${redirect_url}?token=${token}`);
    });
  });
  return authenticator(req, res, next);
});

// Route to handle user logout
authRouter.get("/logout", (req, res) => {
  // Logout user and redirect to homepage
  req.logout({}, () => {
    res.redirect("/");
  });
});

// Export the authentication router
module.exports = authRouter;
