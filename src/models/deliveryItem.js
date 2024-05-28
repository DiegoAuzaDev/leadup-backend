const { model, Schema, Types } = require("mongoose");
const { employeeKey, companyKey } = require("../utils/keys.js");
const { locationSchema } = require("./location");

const deliveryItemSchema = new Schema({
  ownerName: {
    Type: String,
    require: true,
  },
  owner_id: {
    type: Number,
    require: true,
    unique: true,
  },
  location: locationSchema,
});