const { model, Schema, Types } = require("mongoose");
const { userKey, companyKey } = require("../utils/keys");

const locationSchema = new Schema(
  {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: locationSchema,
    country: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Array,
      of: Number,
      default: [],
    },
    numberExtension: {
      type: Number,
      default: 1,
    },
    task: {
      type: Array,
      of: String,
      default: [],
    },
    ownerId: {
      type: Types.ObjectId,
      ref: `${userKey}`,
      require: true,
    },
    placeId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

companySchema.set("toObject", {
    transform : (_doc, ret)=>{
        return {
          ...ret,
          id: ret._id.toString(),
        };
    }
})

module.exports = model(`${companyKey}`, companySchema);