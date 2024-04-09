"use strict";

// Importing Company model and error classes
const Company = require("../models/company");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// Importing function for Google Maps API address validation
const { googleMapValidation } = require("../utils/googleMaps");

// Function to retrieve all companies belonging to a specific owner
const getAll = async (ownerId) => {
  const company = await Company.find({ ownerId });
  return company;
};

// Function to retrieve a single company by its ID
const getOne = async (id) => {
  const foundCompany = await Company.findById(id);
  if (!foundCompany) throw new NotFoundError(`Company with id ${id} not found`);
  return foundCompany;
};

// Function to create a new company
const create = async (companyData) => {
  const newCompany = new Company(companyData);
  await newCompany.save();
  return newCompany;
};

// Function to replace company data with new data
const replace = async (id, companyData) => {
  if (!companyData.country || !companyData.address || !companyData.name) {
    throw new BadRequestError("Name, address, and country are required");
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

// Function to update company data with specified fields
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

// Function to delete a company by its ID
const deleteOne = async (id) => {
  const deletedCompany = await Company.findByIdAndDelete(id);
  if (deletedCompany == null) {
    throw new NotFoundError("Company with id " + id + " not found");
  }
  return deletedCompany;
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

// Function to format company location data using Google Maps API
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
