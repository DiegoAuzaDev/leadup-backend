"use strict";

const { Router} = require ("express")
const isAuthnticated = require("../middleware/isAuthenticated");
const CustumerController = require("../controllers/custumer.js")

const custumerRouter = Router();

custumerRouter.use(isAuthnticated)


custumerRouter.get("/:companyId", CustumerController.getAll);
custumerRouter.get("/:companyId/costumerItemId", CustumerController.getOne);
custumerRouter.post("/:companyId", CustumerController.create);



module.exports = custumerRouter