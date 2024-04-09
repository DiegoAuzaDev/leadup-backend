const EmployeeServices = require("../services/employee.js");
const { BadRequestError, NotFoundError } = require("../utils/errors.js");

// Controller function to get all employees of a company
const getAll = async (req, res, next) => {
  try {
    // Extract companyId from request parameters
    const companyId = req.params.companyId;
    // Retrieve all employees of the company
    const employees = await EmployeeServices.getAll(companyId);
    // Send response with the retrieved employees
    res.json(employees);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to get a single employee by their ID
const getOne = async (req, res, next) => {
  // Extract companyId and employeeId from request parameters
  const companyId = req.params.companyId;
  const employeeId = req.params.employeeId;
  try {
    // Retrieve the employee by their ID and the company ID
    const foundEmployee = await EmployeeServices.getOne(companyId, employeeId);
    // Send response with the retrieved employee
    res.status(201).json(foundEmployee);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to create a new employee for a company
const create = async (req, res, next) => {
  try {
    // Extract companyId from request parameters
    const companyId = req.params.companyId;
    // Extract necessary fields from request body
    const { name, employee_id, phoneNumber, email } = req.sanitizedBody;
    // Validate presence of companyId
    if (!companyId) {
      throw new BadRequestError("Missing company Id");
    }
    // Create new employee with provided data
    const createEmployee = await EmployeeServices.create({
      companyId,
      name,
      employee_id,
      phoneNumber,
      email,
    });
    // Send response with the created employee
    res.status(201).json(createEmployee);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to replace an existing employee with new data
const replace = async (req, res, next) => {
  // Extract companyId and employeeId from request parameters
  const companyId = req.params.companyId;
  const employeeId = req.params.id;

  try {
    // Replace the employee with the provided ID using the request body data
    const employeToReplace = await EmployeeServices.replace(
      companyId,
      employeeId,
      req.sanitizedBody
    );
    // Send response with the replaced employee
    res.json(employeToReplace);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to update an existing employee
const update = async (req, res, next) => {
  // Extract companyId and employeeId from request parameters
  const companyId = req.params.companyId;
  const employeeId = req.params.id;
  try {
    // Update the employee with the provided ID using the request body data
    const employeToUpdate = await EmployeeServices.update(
      companyId,
      employeeId,
      req.sanitizedBody
    );
    // Send response with the updated employee
    res.json(employeToUpdate);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to delete an employee by their ID
const deleteOne = async (req, res, next) => {
  // Extract companyId and employeeId from request parameters
  const companyId = req.params.companyId;
  const employeeId = req.params.id;
  try {
    // Delete the employee with the provided ID
    const deletedEmployee = await EmployeeServices.deleteOne(
      companyId,
      employeeId
    );
    // Send response with the deleted employee
    res.json(deletedEmployee);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  update,
  deleteOne,
};
