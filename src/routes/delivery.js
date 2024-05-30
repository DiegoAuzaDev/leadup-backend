"use strict";

const { Router} = require ("express")
const isAuthnticated = require("../middleware/isAuthenticated");

const deliveryRouter = Router();

deliveryRouter.use(isAuthnticated)


deliveryRouter.get("/:companyId", ()=>{})
deliveryRouter.get("/:companyId/deliveryItemId", ()=>{});
deliveryRouter.post("/:companyId", ()=>{});



module.exports = deliveryRouter