const { model, Schema, Types } = require("mongoose");
const { employeeKey, locationKey, companyKey } = require("../utils/keys.js");

const employeeLocationSchema = new Schema(
  {
    companyId: {
      type: Types.ObjectId,
      ref: `${companyKey}`,
      require: true,
    },
    employee_id: {
      type: Types.ObjectId,
      ref: `${employeeKey}`,
      require: true,
    },
    coordinates: {
      type: String,
      enum: ["Point"],
      require: true,
    },
  },
  { timestamps: true }
);

employeeLocationSchema.set("toObject", {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString(),
    };
  },
});

module.exports = model(`${locationKey}`, employeeLocationSchema);