require("dotenv").config();
const { Router } = require("express");
const passport = require("passport")
const jwt = require("jsonwebtoken")

require("../utils/passport")


const localRouter = Router();

localRouter.get("login", (req, res)=>{

});
localRouter.get("signup", (req, res) => {});

localRouter.get("/logout", (req, res) => {
  req.logout({}, () => {
    res.redirect("/");
  });
});

module.exports = localRouter;
