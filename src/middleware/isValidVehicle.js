const validVehicleFormat = require("../utils/vehicle");

const toLowerCase = (textoToTrasnform)=>{
    return textoToTrasnform.toLowerCase()
}

const isValidBrand = (brand)=>{
  return Object.values(validVehicleFormat.vehicleBrand).includes(toLowerCase(brand));
}

const isValidColor = (color)=>{
    let isValid = -1;

    return isValid
}

const isValidFuelSource = (fuel)=>{

    let isValid = -1;

    return isValid
};

const isValidWidth = (width)=>{
    let isValid = -1;

    return isValid;
}

module.exports = {
    isValidBrand
}