const Vehicle = require("../models/vehicle")
const { NotFoundError, BadRequestError } = require("../utils/errors");

const getAll = async(ownerId)=>{
  const employee = await Vehicle.find({ companyId: { $eq: ownerId } });
  return employee;
};

const getOne = async(companyId, vehicleId)=>{
    const foundVehicle = await Vehicle.findOne({
      _id: vehicleId,
      companyId: { $eq: companyId },
    });
      if (foundVehicle == null) {
        throw new NotFoundError("Vehicle with " + vehicleId + " not found");
      }
      return foundVehicle;
};

const create = async(companyId, vehicle)=>{
  
};

module.exports = {
    getAll,
    getOne,
}