"use strict";

require("dotenv").config();
const { Router} = require("express")
const isAuthnticated = require("../middleware/isAuthenticated")

const vehicleRouter = Router();

vehicleRouter.use(isAuthnticated);
