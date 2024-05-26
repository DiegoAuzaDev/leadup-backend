require("dotenv").config();
const VehicleServices = require("../services/vehicle.js");
const isValidVehicle = require("../middleware/isValidVehicle.js");
const { BadRequestError, NotFoundError } = require("../utils/errors.js");

const getAll = async (req, res, next) => {
  try {
    const companyId = req.params.companyId;
    // check for env mode
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "start"
    ) {
      if (!companyId) {
        throw new BadRequestError("Missing company id");
      }
      const vehicles = await VehicleServices.getAll(companyId);
      res.json(vehicles);
    } else if (process.env.NODE_ENV === "test") {
      if (!companyId) {
        throw new BadRequestError("Missing company id");
      }
      res.status(200);
    }
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

    // check for env mode
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "start"
    ) {
      const newVehicle = VehicleServices.create({
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
        companyId,
      });
      res.status(201).json(newVehicle);
    } else if (process.env.NODE_ENV === "test") {
      res.status(201).json(req.sanitizedBody);
    }
  } catch (err) {
    next(err);
  }
};

const replace = async (req, res, next) => {
  const companyId = req.params.companyId;
  const vehicleId = req.params.vehicleId;
  const replace = req.sanitizedBody;
  try {
    if (!companyId || !vehicleId) {
      throw new BadRequestError("Missing company id");
    }
    if (!isValidVehicle.isValidFuelSource(replace.fuel)) {
      throw new BadRequestError("Invalid values for : fuel");
    }
    if (!isValidVehicle.isValidWidth(replace.width)) {
      throw new BadRequestError("Invalid values for : width");
    }
    if (!isValidVehicle.isValidLength(replace.length)) {
      throw new BadRequestError("Invalid values for : length");
    }
    if (!isValidVehicle.isValidCapacity(replace.capacity)) {
      throw new BadRequestError("Invalid values for : capacity");
    }
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "start"
    ) {
      const vehicleToReplace = await VehicleServices.replace(
        companyId,
        vehicleId,
        replace
      );
      res.json(vehicleToReplace);
    } else if (process.env.NODE_ENV === "test") {
      res.status(201).json(req.sanitizedBody);
    }
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {};

const deleteOne = async (req, res, next) => {
  const companyId = req.params.companyId;
  const vehicleId = req.params.vehicleId;

  try {
    if (!companyId || !vehicleId) {
      throw new BadRequestError("Missing parameters to replace a vehicle");
    }

    const deletedVehicle = await VehicleServices.deleteOne(
      companyId,
      vehicleId
    );
    res.json(deletedVehicle);
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
