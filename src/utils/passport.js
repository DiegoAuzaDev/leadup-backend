"use strict";
require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/auth");
const { UnauthorizedError } = require("./errors");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (_accessToken, _refreshToken, profile, cb) {
      try {
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
        const user = await User.findOne({ "local.email": email });
        if (user) {
          console.log("user found")
          throw new UnauthorizedError("That email is already taken");
        } 
          const savedUser = await User.create({
            "local.name": req.user.name,
            "local.email": email,
            "local.password": password,
            "local.photo" : req.user.photo
          });
          cb(null, savedUser)
      } catch (err) {
        cb( err)
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
