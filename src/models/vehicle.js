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
  color : { 
    type : String,
    require : true,
  },
  plateNumber : { 
    type : String, 
    require : true 
  }
});


// Mercedes - Benz;
// Volvo;
// Scania;
// MAN;
// Iveco;
// Ford;
// Chevrolet;
// Dodge;
// Volkswagen;
// Renault;
