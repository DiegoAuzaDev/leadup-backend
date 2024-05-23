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

const create = async(vehicle)=>{
  const newVehicle = new Vehicle(vehicle);
  await newVehicle.save()
  return newVehicle;
};

const deleteOne = async(companyId, vehicleId)=>{
  const deletedVehicle = await Vehicle.findOneAndDelete({
    _id: vehicleId,
    companyId: companyId,
  });
  if(deleteOne == null){
        throw new NotFoundError("Vehicle with id " + vehicleId + " not found");
  } 
  return deletedVehicle;
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
};