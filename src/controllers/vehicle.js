const VehicleServices = require("../services/vehicle.js");
const isValidVehicle = require("../middleware/isValidVehicle.js");
const { BadRequestError, NotFoundError } = require("../utils/errors.js");

const getAll = async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    console.log(companyId)
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

const create = async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    const {
      brand,
      model,
      year,
      width,
      length,
      color,
      description,
      fuel,
      plateNumber,
      capacity,
    } = req.sanitizedBody;
    if (!companyId) {
      throw new BadRequestError("Missing company id");
    }
    if (!isValidVehicle.isValidBrand(brand)) {
      throw new BadRequestError("Invalid values for : brand");
    }

    if (!isValidVehicle.isValidColor(color)) {
      throw new BadRequestError("Invalid values for : color");
    }

    if (!isValidVehicle.isValidFuelSource(fuel)) {
      throw new BadRequestError("Invalid values for : fuel");
    }
    if (!isValidVehicle.isValidWidth(width)) {
      throw new BadRequestError("Invalid values for : width");
    }
    if (!isValidVehicle.isValidLength(length)) {
      throw new BadRequestError("Invalid values for : length");
    }
    if (!isValidVehicle.isValidCapacity(capacity)) {
      throw new BadRequestError("Invalid values for : capacity");
    }
    res.status(201).json(req.sanitizedBody);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
};
