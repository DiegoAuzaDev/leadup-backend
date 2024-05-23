"use strict";

require("dotenv").config();
const { Router} = require("express")
const VehicleController = require("../controllers/vehicle")
const isAuthnticated = require("../middleware/isAuthenticated")

const vehicleRouter = Router();

vehicleRouter.use(isAuthnticated);

vehicleRouter.get("/:companyId", VehicleController.getAll);
vehicleRouter.get("/:companyId/:vehicleId", VehicleController.getOne);
vehicleRouter.post("/:companyId", VehicleController.create);
vehicleRouter.put("/:companyId/:vehicleId", VehicleController.replace);
vehicleRouter.patch("/:companyId/:vehicleId", VehicleController.update);
vehicleRouter.delete("/:companyId/:vehicleId", VehicleController.deleteOne);



module.exports = vehicleRouter;