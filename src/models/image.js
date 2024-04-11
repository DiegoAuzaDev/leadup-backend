const { model, Schema, Types } = require("mongoose");
const { imageKey } = require("../utils/keys.js");

const imageSchema = new Schema({
  fileName: {
    type: String,
    require: true,
  },
  filePath: {
    type: String,
    require: true,
  },
});


module.exports = model(`${imageKey}`, imageSchema);