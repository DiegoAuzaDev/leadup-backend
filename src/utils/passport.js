"use strict";
require("dotenv").config();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/auth");


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (_accessToken, _refreshToken, profile, cb) {
      console.log(profile)
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
