const { BadRequestError, NotFoundError } = require("../utils/errors.js");
const getAll = async (req, res, next) => {};

const getOne = async (req, res, next) => {};

const create = async (req, res, next) => {
  const companyId = req.params.companyId;
  const arrayOfDeliveries = req.sanitizedBody;
  const invalidIndex = [];
  const validIndex = [];
  try {
    if (!companyId) {
      throw new BadRequestError("Missing company id");
    }
    if(!arrayOfDeliveries || arrayOfDeliveries.length == 0){
      throw new BadRequestError("Missing list of deliveries");
    }
    for (let index = 0; index < arrayOfDeliveries.length; index++) {
      try {
        if (!index) {
          throw new Error("invalid");
        }
        validIndex.push(index);
      } catch (err) {
        invalidIndex.push(index);
      }
    }

    if (invalidIndex.length > 0) {
      res.status(200).json({
        status: "OK",
        message: "Processing completed with some errors.",
        validIndex,
        invalidIndex,
      });
    } else if (invalidIndex.length == 0) {
      res.status(200).json({
        status: "OK",
        message: "Processing completed",
        validIndex,
        invalidIndex,
      });
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
