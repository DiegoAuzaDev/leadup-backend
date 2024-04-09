const CompanyServices = require("../services/user");
const { BadRequestError } = require("../utils/errors.js");
const mapUtils = require("../utils/googleMaps.js");

// Controller function to get all companies owned by the authenticated user
const getAll = async (req, res, next) => {
  try {
    // Extract the ownerId from the authenticated user
    const { _id: ownerId } = req.user;
    // Retrieve user details
    let user = req.user;
    // Retrieve all companies owned by the user
    const company = await CompanyServices.getAll(ownerId);
    // Send response with company data and user details
    res.json({ company, user });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to get a single company by its ID
const getOne = async (req, res, next) => {
  try {
    // Retrieve the company by its ID and the authenticated user's ID
    const company = await CompanyServices.getOne(req.params.id, req.user.id);
    // Send response with the retrieved company
    res.json(company);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller function to create a new company
const create = async (req, res, next) => {
  try {
    // Extract necessary fields from request body and authenticated user
    const { _id: ownerId } = req.user;
    const { name, address, country, phoneNumber, numberExtension, task } =
      req.sanitizedBody;
    // Validate required fields
    if (!address || !country || !name) {
      throw new BadRequestError("Missing Params");
    }
    // Validate and format address using Google Maps API
    const getAddress = await mapUtils.googleMapValidation(address, country);

    // Create new company with validated and formatted data
    const createCompany = await CompanyServices.create({
      name,
      address: `${getAddress.formattedAddress}`,
      location: getAddress.location,
      country,
      phoneNumber,
      numberExtension,
      task,
      ownerId,
      placeId: getAddress.placeid,
    });
    // Send response with the created company
    res.status(201).json(createCompany);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to replace an existing company
const replace = async (req, res, next) => {
  try {
    // Replace the company with the provided ID using the request body data
    const companyToReplace = await CompanyServices.replace(
      req.params.id,
      req.sanitizedBody
    );
    // Send response with the replaced company
    res.json(companyToReplace);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to update an existing company
const update = async (req, res, next) => {
  try {
    // Update the company with the provided ID using the request body data
    const companyToUpdate = await CompanyServices.update(
      req.params.id,
      req.sanitizedBody
    );
    // Send response with the updated company
    res.json(companyToUpdate);
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

// Controller function to delete a company by its ID
const deleteOne = async (req, res, next) => {
  try {
    // Delete the company with the provided ID
    const deletedComany = await CompanyServices.deleteOne(req.params.id);
    // Send response with the deleted company
    res.json(deletedComany);
  } catch (err) {
    // Pass any errors to the error handling middleware
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
