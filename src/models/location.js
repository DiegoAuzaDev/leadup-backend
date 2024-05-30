const { Schema } = require("mongoose");
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

module.exports = { locationSchema };
