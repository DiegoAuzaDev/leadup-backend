"use strict";
require("dotenv").config();
const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");

const imagesRouter = Router();


module.exports = imagesRouter;
