// Load environment variables from .env file
require("dotenv").config();

// Importing bcrypt for password hashing
const bcrypt = require("bcrypt");

// Function to generate hash for password
function generateHash(password) {
  const saltRounds = 10; // Number of salt rounds for password hashing
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        reject(err); // Reject promise if there's an error
      } else {
        resolve(hash); // Resolve promise with hash
      }
    });
  });
}

// Function to validate password against hash
function validPassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        reject(err); // Reject promise if there's an error
      } else {
        resolve(result); // Resolve promise with result of password validation
      }
    });
  });
}

// Exporting functions for external use
module.exports = {
  generateHash,
  validPassword,
};
