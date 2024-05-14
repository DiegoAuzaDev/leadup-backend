const vehicleBrand = {
  Mercedes: "mercedes",
  Volvo: "volve",
  Scania: "scania",
  Iveco: "iveco",
  Ford: "ford",
  Chevrolet: "chevrolet",
  Dodge: "dodge",
  Volkswagen: "volkswagen",
  Renault: "renault",
};

const vehicleColors = {
  Black: "black",
  White: "white",
  Gray: "gray",
  Red: "red",
  Orange: "orange",
  Blue: "blue",
  Yellow: "yellow",
};

const vehicleSpecs = {
  maxDimensions: {
    maxWidth: 2.6, // meters
    maxLength: 12, // meters
    minWidth: 1.5, // meters
    minLength: 5, // meters
  },
  minYear: 1990,
  maxCapacity: 40, // tons
  minCapacity: 1, // ton
};

const vechicleFuelSource = {
  Diesle: "diesel",
  Gasoline: "gasoline",
  Electric: "electric",
  Hybrid: "hibrid",
};

module.exports = {
  vehicleColors,
  vehicleBrand,
  vehicleSpecs,
  vechicleFuelSource,
};
