const axios = require("axios");
require("dotenv").config();

const address = "Testing new route for my API asdasdas";


const googleMapsValidation = async (address, country) => {
  const GOOGLEKEY = process.env.GOOGLE_MAP_API;
  const googleUrlValidateingAddress = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLEKEY}`;
  try {
    const validAddress = await axios.post(googleUrlValidateingAddress, {
      address: {
        regionCode: country,
        addressLines: [address], // Passing the address to validate
      },
    });

    if (!validAddress.data.result) {
      console.log("No result found for the address.");
    } else {
      console.log(validAddress.data.result);
      console.log(validAddress.data.result.geocode.location);
      console.log(validAddress.data.result.geocode.placeId);
      console.log(validAddress.data.result.address.formattedAddress);
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};

googleMapsValidation(address, "CO");
