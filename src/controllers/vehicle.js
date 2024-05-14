const VehicleServices = require("../services/vehicle.js");
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
    const { brand, model, year, width, length, color, description, plateNumber } =
      req.sanitizedBody;
    if (!companyId) {
      throw new BadRequestError("Missing company id");
    }
  } catch (err) {
    next(err);
  }
};



module.exports = {
  getAll,
  getOne,
  create,
};
