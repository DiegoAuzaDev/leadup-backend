"use strict";

// Importing Employee model, Mongoose Types, and error classes
const Employee = require("../models/employee.js");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// Function to retrieve all employees belonging to a specific company
const getAll = async (companyId) => {
  const employee = await Employee.find({ companyId: { $eq: companyId } });
  return employee;
};

// Function to retrieve a single employee by company ID and employee ID
const getOne = async (companyId, employeeId) => {
  const foundEmployee = await Employee.findOne({
    _id: employeeId,
    companyId: { $eq: companyId },
  });
  if (foundEmployee == null) {
    throw new NotFoundError("Employee with " + employeeId + " not found");
  }
  return foundEmployee;
};

// Function to create a new employee
const create = async (employeeData) => {
  const newEmployee = new Employee(employeeData);
  await newEmployee.save();
  return newEmployee;
};

// Function to replace employee data with new data
const replace = async (companyId, employeeId, dataToReplace) => {
  if (!companyId || !employeeId) {
    throw new BadRequestError("Missing parameter to find employee");
  }
  if (
    !dataToReplace.name ||
    !dataToReplace.phoneNumber ||
    !dataToReplace.email
  ) {
    throw new BadRequestError("Missing parameter to replace employee");
  }
  const replacedEmployee = await Employee.findOneAndUpdate(
    {
      _id: employeeId,
      companyId: { $eq: companyId },
    },
    {
      ...dataToReplace,
    },
    {
      returnOriginal: false,
    }
  );
  if (replacedEmployee == null) {
    throw new NotFoundError("Employee with id " + employeeId + " not found");
  }
  return replacedEmployee;
};

// Function to update employee email
const update = async (companyId, employeeId, dataToUpdate) => {
  if (!companyId || !employeeId) {
    throw new BadRequestError("Missing parameters to find employee");
  }
  if (!dataToUpdate.email) {
    throw new BadRequestError("Missing parameter to update employee");
  }
  const updatedEmployee = await Employee.findOneAndUpdate(
    {
      _id: employeeId,
      companyId: companyId,
    },
    {
      email: dataToUpdate.email,
    },
    {
      returnOriginal: false,
    }
  );
  if (updatedEmployee == null) {
    throw new NotFoundError("Employee with id " + employeeId + " not found");
  }
  return updatedEmployee;
};

// Function to delete an employee by company ID and employee ID
const deleteOne = async (companyId, employeeId) => {
  const deletedEmployee = await Employee.findOneAndDelete({
    _id: employeeId,
    companyId: companyId,
  });
  if (deletedEmployee == null) {
    throw new NotFoundError("Employee with id " + employeeId + " not found");
  }
  return deletedEmployee;
};

// Exporting functions for external use
module.exports = {
  getAll,
  getOne,
  create,
  replace,
  deleteOne,
  update,
};
