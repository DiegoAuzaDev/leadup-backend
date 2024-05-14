const VehicleServices = require("../services/vehicle.js");
const vehicleEnum = require("../utils/vehicle.js");
const { BadRequestError, NotFoundError } = require("../utils/errors.js");

const getAll = async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const vehicles = await VehicleServices.getAll(companyId);
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const companyId = req.params.companyId;
  const vehicleId = req.params.vehicleId;
  try {
    const foundVehicle = await VehicleServices.getOne(companyId, vehicleId);
    res.status(201).json(foundVehicle);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, send) => {
  try {
    const companyId = req.params.companyId;
    const { brand, model, year, width, length, color, plateNumber } =
      req.sanitizedBody;
    if (!companyId) {
      throw new BadRequestError("Missing company id");
    }
  } catch (err) {
    next(err);
  }
};

function isValidColors(color) {
  return Object.values(vehicleEnum.vehicleColors).includes(color.toLowerCase());
}

function isValidBrand(brand) {
  return Object.values(vehicleEnum.vehicleBrand).includes(color.toLowerCase());
}

module.exports = {
  getAll,
  getOne,
};
