const validVehicleFormat = require("../utils/vehicle");

const toLowerCase = (textoToTrasnform) => {
  return textoToTrasnform.toLowerCase();
};

const isValidBrand = (brand) => {
  return Object.values(validVehicleFormat.vehicleBrand).includes(
    toLowerCase(brand)
  );
};

const isValidColor = (color) => {
  return Object.values(validVehicleFormat.vehicleColors).includes(
    toLowerCase(color)
  );
};

const isValidFuelSource = (fuel) => {
  return Object.values(validVehicleFormat.vechicleFuelSource).includes(
    toLowerCase(fuel)
  );
};

const isValidWidth = (width) => {
  const { maxWidth, minWidth } =
    validVehicleFormat.vehicleSpecs.maxDimensions.width;
  let isNumber = typeof width === "number" && !isNaN(width);
  let isLessThanMaxValue = width <= maxWidth;
  let isLargerThanMinValue = width >= minWidth;
  if (isNumber && isLessThanMaxValue && isLargerThanMinValue) {
    return true;
  }

  return false;
};

module.exports = {
  isValidBrand,
  isValidColor,
  isValidFuelSource,
  isValidWidth,
};
