const { BadRequestError, NotFoundError } = require("../utils/errors.js");
const getAll = async (req, res, next) => {};

const getOne = async (req, res, next) => {};

const create = async (req, res, next) => {
  const companyId = req.params.companyId;
  const arrayOfDeliveries = req.sanitizedBody;
  try {

  }
  catch(err){
    next(err)
  }
};

module.exports = {
  getAll,
  getOne,
  create,
};
