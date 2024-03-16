"use strict";

require("dotenv").config();
const { Router} = require("express")
const isAuthenticated = require("../middleware/isAuthenticated.js")
const EmployeeController = require("../controllers/employee.js")

const employeeRouter = Router();

employeeRouter.use(isAuthenticated)

employeeRouter.get("/:companyId", EmployeeController.getAll);
employeeRouter.get("/:companyId/:employeeId", EmployeeController.getOne);
employeeRouter.post("/:companyId", EmployeeController.create);
employeeRouter.put("/:companyId/:id", EmployeeController.replace);
employeeRouter.patch("/:companyId/:id", EmployeeController.update);
employeeRouter.delete("/:companyId/:id", EmployeeController.deleteOne);

module.exports = employeeRouter