const CompanyServices = require("../services/user");
const { BadRequestError } = require("../utils/errors.js");
const mapUtils = require("../utils/googleMaps.js");

const getAll = async (req, res, next) => {
  try {
    const { _id: ownerId } = req.user;
    let user = req.user;
    const company = await CompanyServices.getAll(ownerId);
    res.json({company , user});
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const company = await CompanyServices.getOne(req.params.id, req.user.id);
    res.json(company);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { _id: ownerId } = req.user;
    const { name, address, country, phoneNumber, numberExtension, task } =
      req.sanitizedBody;
    if (!address || !country || !name) {
      throw new BadRequestError("Missing Params");
    }
    const getAddress = await mapUtils.googleMapValidation(address, country);

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
    res.status(201).json(createCompany);
  } catch (err) {
    next(err);
  }
};

const replace = async (req, res, next) => {
  try {
    const companyToReplace = await CompanyServices.replace(
      req.params.id,
      req.sanitizedBody
    );
    res.json( companyToReplace );
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const companyToUpdate = await CompanyServices.update(
      req.params.id,
      req.sanitizedBody
    );
    res.json(companyToUpdate);
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const deletedComany = await CompanyServices.deleteOne(req.params.id);
    res.json(deletedComany);
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
