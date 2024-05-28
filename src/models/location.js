const { model, Schema, Types } = require("mongoose");
const { employeeKey, locationKey } = require("../utils/keys");

const locationSchema = new Schema(
  {
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

locationSchema.set("toObject", {
    transform : (_doc, ret) => {
        return {
          ...ret,
          id: ret._id.toString(),
        };
    }
})

module.exports = model(`${locationKey}`, locationSchema)