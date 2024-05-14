const vehicleValidation = require("../../middleware/isValidVehicle")

test('The vehicle validation must return FALSE if the brand is not valid', () => { 
    expect(vehicleValidation.isValidBrand("Diego Auza")).toBe(false)
 })

test('The vehicle validation must return TRUE if the brand is not valid', () => { 
    expect(vehicleValidation.isValidBrand("Mercedes")).toBe(true)
 })