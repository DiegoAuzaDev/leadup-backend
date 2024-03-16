const axios = require("axios");
const { NotFoundError, BadRequestError } = require("./errors");
const GOOGLE_KEY = process.env.GOOGLE_MAP_API;
const googleUrlValidateingAddress = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLE_KEY}`;

const googleMapValidation = async (address, region) => {
  let addressData = null;
  try {
    const validAddress = await axios.post(googleUrlValidateingAddress, {
      address: {
        regionCode: region,
        addressLines: [address],
      },
    });

    if (!validAddress.data.result) {
      throw new NotFoundError("Address not found");
    } else {
      addressData = {
        location: validAddress.data.result.geocode.location,
        placeid: validAddress.data.result.geocode.placeId,
        formattedAddress: validAddress.data.result.address.formattedAddress,
      };
      return addressData;
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    throw new BadRequestError("Google Map error" + error.message);
  }
};

module.exports = {
  googleMapValidation,
};
