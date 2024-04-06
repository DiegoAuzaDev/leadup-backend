require("dotenv").config();
const bcrypt = require("bcrypt");

function generateHash(password) {
  const saltRounds = 10; // Number of salt rounds to use for hashing
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        reject(err); 
      } else {
        resolve(hash); 
      }
    });
  });
}

function validPassword(myPlaintextPassword, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      if (err) {
        reject(err); // If there's an error, reject the promise with the error
      } else {
        resolve(result); // Resolve the promise with the comparison result
      }
    });
  });
}

module.exports = {
  generateHash,
  validPassword,
};
