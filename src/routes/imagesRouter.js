"use strict";
require("dotenv").config();
const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const upload = require("../middleware/upload")


const imagesRouter = Router();

imagesRouter.use(isAuthenticated);

module.exports = imagesRouter;
