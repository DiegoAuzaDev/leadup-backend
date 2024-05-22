const axios = require("axios");
require("dotenv").config();
const { NotFoundError, BadRequestError } = require("./errors");

// Retrieve Google API key from environment variables
const GOOGLE_KEY = process.env.GOOGLE_MAP_API;



// Construct URL for Google Maps API address validation
const googleUrlValidateingAddress = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLE_KEY}`;

// Function to validate address using Google Maps API
const googleMapValidation = async (address, region) => {
  let addressData = null;
  try {
    // Send POST request to Google Maps API for address validation
    const validAddress = await axios.post(googleUrlValidateingAddress, {
      address: {
        regionCode: region,
        addressLines: [address],
      },
    });
    // If no result is returned, throw NotFoundError
    if (!validAddress.data.result) {
      throw new NotFoundError("Address not found");
    } else {
      // Extract relevant data from the response
      addressData = {
        location: validAddress.data.result.geocode.location,
        placeid: validAddress.data.result.geocode.placeId,
        formattedAddress: validAddress.data.result.address.formattedAddress,
      };
      return addressData;
    }
  } catch (error) {
    // Log error and throw BadRequestError with custom message
    throw new BadRequestError("Google Map error " + error.message);
  }
};

// Export the function for external use
module.exports = {
  googleMapValidation,
};
