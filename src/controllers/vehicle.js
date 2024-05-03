const VehicleServices = requires("../services/vehicle.js");
const { BadRequestError, NotFoundError } = require("../utils/errors.js");

const getAll = async (req, ser, next) => {
  try {
    const companyId = req.params.companyId;
  } catch (err) {
    next(err);
  }
};
