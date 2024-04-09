"use strict";
// todo fix grammar 

const Company = require("../models/company");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const { googleMapValidation } = require("../utils/googleMaps");

const getAll = async (ownerId) => {
  const company = await Company.find({ ownerId });
  return company;
};

const getOne = async (id) => {
  const foundCompany = await Company.findById(id);
  if (!foundCompany) throw new NotFoundError(`Company with id ${id} not found`);
  return foundCompany;
};

const create = async (companyData) => {
  const newCompany = new Company(companyData);
  await newCompany.save();
  return newCompany;
};

const replace = async (id, companyData) => {
  if (!companyData.country || !companyData.address || !companyData.name) {
    throw new BadRequestError("Name, address and country are required");
  }
  const formatedUserLocationData = await locationUserFormatting(companyData);
  const replaceCompany = await Company.findByIdAndUpdate(
    id,
    {
      ...formatedUserLocationData,
    },
    {
      returnOriginal: false,
    }
  );
   if (replaceCompany == null) {
     throw new NotFoundError("Company with id " + id + " not found");
   }
  return replaceCompany;
};

const update = async (id, updatedFields) => {
  if (!Object.keys(updatedFields).length) {
    throw new BadRequestError("Nothing to update");
  }
  if (updatedFields.address && updatedFields.country) {
    updatedFields = await locationUserFormatting(updatedFields);
  }
  const updatedCompany = await Company.findByIdAndUpdate(
    id,
    {
      ...updatedFields,
    },
    {
      returnOriginal: false,
    }
  );
  if (updatedCompany == null) {
    throw new NotFoundError("Company with id " + id + " not found");
  }
  return updatedCompany;
};

const deleteOne = async (id) => {
  const deletedCompany = await Company.findByIdAndDelete(id);
  if (deletedCompany == null) {
    throw new NotFoundError("Company with id " + id + " not found");
  }
  return deletedCompany;
};

module.exports = {
  getAll,
  getOne,
  create,
  replace,
  deleteOne,
  update,
};

const locationUserFormatting = async (companyData) => {
  const formatedLocationData = companyData;
  const updatedLocation = await googleMapValidation(
    companyData.address,
    companyData.country
  );
  formatedLocationData.address = updatedLocation.formattedAddress;
  formatedLocationData.placeId = updatedLocation.placeid;
  formatedLocationData.location = updatedLocation.location;
  return formatedLocationData;
};
