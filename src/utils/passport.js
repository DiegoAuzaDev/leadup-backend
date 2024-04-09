"use strict";

// Load environment variables from .env file
require("dotenv").config();

// Importing passport for authentication
const passport = require("passport");

// Importing strategies for Google OAuth and local authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

// Importing User model for database operations
const User = require("../models/auth");

// Importing custom error class for unauthorized errors
const { UnauthorizedError } = require("./errors");

// Importing functions for password hashing and validation
const { generateHash, validPassword } = require("./passwordValidation");

// Setting up Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (_accessToken, _refreshToken, profile, cb) {
      try {
        // Find or create user based on Google profile data
        const user = await User.findOneAndUpdate(
          {
            "google.id": profile.id,
          },
          {
            $set: {
              "google.name": profile.displayName,
              "google.id": profile.id,
              "google.email": profile._json.email,
              "google.photo": profile._json.picture,
            },
          },
          {
            upsert: true,
            returnDocument: "after",
          }
        );
        cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);

// Setting up local login strategy
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, cb) {
      try {
        // Find user by email
        const user = await User.findOne({ "local.email": email });
        if (!user) {
          throw new Error("No user found");
        }

        // Validate password
        let isPasswordValid = await validPassword(
          password,
          user.local.password
        );
        if (!isPasswordValid) {
          throw new UnauthorizedError("Invalid password");
        }

        cb(null, user);
      } catch (err) {
        cb(err);
      }
    }
  )
);

// Setting up local signup strategy
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async function (req, email, password, cb) {
      try {
        // Check if email is already taken
        const user = await User.findOne({ "local.email": email });
        if (user) {
          throw new UnauthorizedError("That email is already taken");
        }

        // Create new user with hashed password
        const savedUser = await User.create({
          "local.name": req.user.name,
          "local.email": email,
          "local.password": await generateHash(password),
        });
        cb(null, savedUser);
      } catch (err) {
        cb(err);
      }
    }
  )
);

// Serialize user object to session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user object from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
