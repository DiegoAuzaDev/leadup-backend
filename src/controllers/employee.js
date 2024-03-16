const EmployeeServices = require("../services/employee.js");
const { BadRequestError, NotFoundError } = require("../utils/errors.js");

const getAll = async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const employees = await EmployeeServices.getAll(companyId);
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const companyId = req.params.companyId;
  const employeeId = req.params.employeeId;
  try {
    const foundEmployee = await EmployeeServices.getOne(companyId, employeeId);
    res.status(201).json(foundEmployee);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const { name, employee_id, phoneNumber, email } = req.sanitizedBody;
    if (!companyId) {
      throw new BadRequestError("Missing company Id");
    }
    const createEmployee = await EmployeeServices.create({
      companyId,
      name,
      employee_id,
      phoneNumber,
      email,
    });
    res.status(201).json(createEmployee);
  } catch (err) {
    next(err);
  }
};
const replace = async (req, res, next) => {
  const companyId = req.params.companyId;
  const employeeId = req.params.id;

  try {
 const employeToReplace = await EmployeeServices.replace(
   companyId,
   employeeId,
   req.sanitizedBody
 );
 res.json(employeToReplace);
  } catch (err) {
    next(err);
  }
};
const update = async (req, res, next) => {
  const companyId = req.params.companyId;
  const employeeId = req.params.id;
  try {
    const employeToUpdate = await EmployeeServices.update(
      companyId,
      employeeId,
      req.sanitizedBody
    );
    res.json(employeToUpdate)
  } catch (err) {
    next(err);
  }
};
const deleteOne = async (req, res, next) => {
  const companyId = req.params.companyId;
  const employeeId = req.params.id;
  try {
    const deletedEmployee = await EmployeeServices.deleteOne(
      companyId,
      employeeId
    );
    res.json(deletedEmployee);
  } catch (err) {
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
