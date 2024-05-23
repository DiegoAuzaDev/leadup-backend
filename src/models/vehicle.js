const { model, Schema, Types } = require("mongoose");
const { companyKey, vehicleKey } = require("../utils/keys.js");

const vehicleSchema = new Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: false,
    default: "",
  },
  year: {
    type: Number,
    require: true,
  },
  width: {
    type: Number,
    require: true,
  },
  length: {
    type: Number,
    require: true,
  },
  color: {
    type: String,
    require: true,
  },
  plateNumber: {
    type: String,
    require: true,
    unique: true,
  },
  companyId: {
    type: Types.ObjectId,
    ref: `${companyKey}`,
    require: true,
  },
});

vehicleSchema.set("toObject", {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString(),
    };
  },
});

module.exports = model(`${vehicleKey}`, vehicleSchema);
