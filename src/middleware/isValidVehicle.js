const validVehicleFormat = require("../utils/vehicle");

const toLowerCase = (textoToTrasnform) => {
  return textoToTrasnform.toLowerCase();
};
const isNumber = (test) => {
  return typeof test === "number" && !isNaN(test);
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
  let isLessThanMaxValue = width <= maxWidth;
  let isLargerThanMinValue = width >= minWidth;
  if (isNumber(width) && isLessThanMaxValue && isLargerThanMinValue) {
    return true;
  }

  return false;
};

const isValidLength = (length) => {
  const { maxLenght, minLenght } =
    validVehicleFormat.vehicleSpecs.maxDimensions.length;
  let isLessThanMaxValue = length <= maxLenght;
  let isLargerThanMinValue = length >= minLenght;
  if (isNumber(length) && isLessThanMaxValue && isLargerThanMinValue) {
    return true;
  }

  return false;
};

const isValidCapacity = (capacity) => {
  const { maxCapacity, minCapacity } =
    validVehicleFormat.vehicleSpecs.maxDimensions.capacity;
  let isLessThanMaxValue = capacity <= maxCapacity;
  let isLargerThanMinValue = capacity >= minCapacity;
  if (isNumber(capacity) && isLessThanMaxValue && isLargerThanMinValue) {
    return true;
  }
  return false;
};

module.exports = {
  isValidBrand,
  isValidColor,
  isValidFuelSource,
  isValidWidth,
  isValidLength,
  isValidCapacity,
};
