const { model, Schema, Types } = require("mongoose");
const {
  employeeKey,
  companyKey,
  deliveryItemKey,
} = require("../utils/keys.js");
const { locationSchema } = require("./location.js");

const paymentState = ["credit", "cash", "transfer"];

const deliveryItemSchema = new Schema(
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
    ownerName: {
      Type: String,
      require: true,
    },
    owner_id: {
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
      require : true
    },
    debtAmount: {
      type: Number,
      default: 0,
      require: true
    },
    images: {
      type: [String],
      require: true,
    },
    location: locationSchema,
  },
  { timestamps: true }
);

deliveryItemSchema.set("toObject", {
  transform: (_doc, ret) => {
    return {
      ...ret,
      id: ret._id.toString(),
    };
  },
});

module.exports = model(`${deliveryItemKey}`, deliveryItemSchema);
