const vehicleValidation = require("../../middleware/isValidVehicle")

// testing vehicle brand

    // invalid value - typo 
test('The vehicle validation must return FALSE if the brand is not valid', () => { 
    expect(vehicleValidation.isValidBrand("MercDESx")).toBe(false)
 })

 test("The vehicle validation must return FALSE if the brand is not valid", () => {
   expect(vehicleValidation.isValidBrand("NewCarBrand")).toBe(false);
 });

    // valid value and checking for string formated
test('The vehicle validation must return TRUE if the brand is not valid', () => { 
    expect(vehicleValidation.isValidBrand("MerceDes")).toBe(true)
 })

// testing vehicle color

    // invalid value - typos

test("The vehicle validation must return FALSE if the color is not valid", () => {
  expect(vehicleValidation.isValidColor("BLAcked")).toBe(false);
});

test("The vehicle validation must return FALSE if the color is not valid", () => {
  expect(vehicleValidation.isValidColor("NewRandomColor#00909")).toBe(false);
});

    // valid value and checking for string formated


test("The vehicle validation must return FALSE if the color is not valid", () => {
  expect(vehicleValidation.isValidColor("WhitE")).toBe(true);
});
