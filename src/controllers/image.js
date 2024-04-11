const { BadRequestError } = require("../utils/errors");

const getAll = async (req, res, next) => {
  try {
    if (!req.file) {
      throw BadRequestError("Missing file");
    }
    const imageUrl = `http://localhost:3004/file/${req.file.filename}`;
    return res.send(imageUrl);
  } catch (error) {
    next(err);
  }
};

module.exports = {
  getAll,
};
