const vehicleColors = {
  Black: "black",
  White: "white",
  Gray : "gray",
  Red: "red",
  Orange : "orange",
  Blue : "blue",
  Yellow: "yellow",
};

const vehicleSpecs = {
  maxDimensions: {
    maxWidth: 2.6, // meters
    maxLength: 12, // meters
  },
  minYear: 1990,
};

const vechicleFuelSource = {
  Diesle : "diesel",
  Gasoline : "gasoline",
  Electric : "electric",
  Hybrid : "hibrid"
}

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

module.exports = {
  vehicleColors,
  vehicleBrand,
  vehicleSpecs,
  vechicleFuelSource,
};