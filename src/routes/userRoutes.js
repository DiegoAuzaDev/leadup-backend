
"use strict";
require("dotenv").config();
const { Router } = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const CompanyController = require("../controllers/user.js")


const userRouter = Router();


userRouter.use(isAuthenticated)

userRouter.get("/", CompanyController.getAll)
userRouter.get("/:id", CompanyController.getOne)
userRouter.post("/", CompanyController.create);
userRouter.put("/:id", CompanyController.replace);
userRouter.patch("/:id", CompanyController.update);
userRouter.delete("/:id", CompanyController.deleteOne);


module.exports = userRouter;