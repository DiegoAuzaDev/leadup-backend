const { generateHash, validPassword } = require("../utils/passwordValidation");

const myDummyPassword = "11111111";
let savedHash = null;

async function sharePassword(myDummyPassword) {
  savedHash = await generateHash(myDummyPassword);
  const result = await validPassword(myDummyPassword, savedHash);
  console.log(result)
}


sharePassword(myDummyPassword);
