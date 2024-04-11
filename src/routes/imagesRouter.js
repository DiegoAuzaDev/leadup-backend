"use strict";
require("dotenv").config();
const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const upload = require("../middleware/upload")
const imageController = require("../controllers/image.js")


const imagesRouter = Router();

imagesRouter.use(isAuthenticated);

imagesRouter.post("/upload", upload.single("file"), imageController.getAll);

module.exports = imagesRouter;
