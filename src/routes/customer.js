"use strict";

const { Router} = require ("express")
const isAuthnticated = require("../middleware/isAuthenticated");
const CustomerController = require("../controllers/customer.js")

const customerRouter = Router();

customerRouter.use(isAuthnticated);


customerRouter.get("/:companyId", CustomerController.getAll);
customerRouter.get("/:companyId/costumerItemId", CustomerController.getOne);
customerRouter.post("/:companyId", CustomerController.create);



module.exports = customerRouter;