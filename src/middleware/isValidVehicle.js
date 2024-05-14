const validVehicleFormat = require("../utils/vehicle");

const toLowerCase = (textoToTrasnform)=>{
    return textoToTrasnform.toLowerCase()
}

const isValidBrand = (brand)=>{
  return Object.values(validVehicleFormat.vehicleBrand).includes(toLowerCase(brand));
}

const isValidColor = (color)=>{
    return Object.values(validVehicleFormat.vehicleColors).includes(toLowerCase(color));
}

const isValidFuelSource = (fuel)=>{
    return Object.values(validVehicleFormat.vechicleFuelSource).includes(toLowerCase(fuel))
};

const isValidWidth = (width)=>{
    let isValid = -1;

    return isValid;
}

module.exports = {
  isValidBrand,
  isValidColor,
  isValidFuelSource,
  isValidWidth,
};