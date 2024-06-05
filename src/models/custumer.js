const { model, Schema, Types } = require("mongoose");
const { employeeKey, companyKey, customerKey } = require("../utils/keys.js");
const { locationSchema } = require("./location.js");

const paymentState = ["credit", "cash", "transfer"];

const customerSchema = new Schema(
  {
    employee_id: {
      type: Types.ObjectId,
      ref: `${employeeKey}`,
      require: true,
    },
    companyId: {
      type: Types.ObjectId,
      ref: `${companyKey}`,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    ownerId: {
      type: Number,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: false,
    },
    paymentMethod: {
      type: String,
      enum: paymentState,
      require: true,
    },
    debtAmount: {
      type: Number,
      default: 0,
      require: true,
    },
    images: {
      type: [String],
      require: true,
    },
    address: {
      type: String,
      require,
    },
    city: {
      type: String,
      require: true,
    },
    location: locationSchema,
  },
  { timestamps: true }
);

customerSchema.set("toObject", {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString(),
    };
  },
});

module.exports = model(`${customerKey}`, customerSchema);
