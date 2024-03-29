"use strict";

const Employee = require("../models/employee.js");
const { Types } = require("mongoose");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async (companyId) => {
  const employee = await Employee.find({ companyId: { $eq: companyId } });
  return employee;
};

const getOne = async (companyId, employeeId) => {
  const foundEmployee = await Employee.findOne({
    _id: employeeId,
    companyId: { $eq: companyId },
  });
  if(foundEmployee == null){
    throw new NotFoundError("Employee with "+ employeeId +  " not found")
  }
  return foundEmployee;
};

const create = async (employeeData) => {
  const newEmployee = new Employee(employeeData);
  await newEmployee.save();
  return newEmployee;
};



const replace = async (companyId, employeeId, dataToReplace) => {
  if(!companyId || !employeeId){
    throw new BadRequestError("Missing parameter to find employee")
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
    }, { 
      returnOriginal : false
    }
  );
   if (replacedEmployee == null) {
     throw new NotFoundError("Employee with id " + employeeId + " not found");
   }
  return replacedEmployee
};
const update = async (companyId, employeeId, dateToUpdate) => {
  if (!companyId || !employeeId) {
    throw new BadRequestError("Missing parameter to find employee");
  }
   if (!dateToUpdate.email) {
     throw new BadRequestError("Missing parameter to update employee");
   }
   const updatedEmployee = await Employee.findOneAndUpdate(
     {
       _id: employeeId,
       companyId: { $eq: companyId },
     },
     {
       email: dateToUpdate.email,
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

const deleteOne = async (companyId, employeeId) => {
  const deletedEmployee = await Employee.findByIdAndDelete({
    _id: employeeId,
    companyId: { $eq: companyId },
  });
  if (deletedEmployee == null) {
    throw new NotFoundError("Employee with id " + employeeId + " not found");
  }
  return deletedEmployee;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  deleteOne,
  update,
};
