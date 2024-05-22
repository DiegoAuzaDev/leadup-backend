const vehicleValidation = require("../../middleware/isValidVehicle");

// testing vehicle brand

// invalid value - typo
test("Testing vechicle validation for brand : MERCSDESx - FALSE", () => {
  expect(vehicleValidation.isValidBrand("MercDESx")).toBe(false);
});

test("Testing vechicle validation for brand : NewCarBrand - FALSE", () => {
  expect(vehicleValidation.isValidBrand("NewCarBrand")).toBe(false);
});

// valid value and checking for string formated
test("Testing vechicle validation for brand : MerceDes - TRUE", () => {
  expect(vehicleValidation.isValidBrand("MerceDes")).toBe(true);
});

// testing vehicle color

// invalid value - typos

test("Testing vechicle validation for color : BLAcked - FALSE", () => {
  expect(vehicleValidation.isValidColor("BLAcked")).toBe(false);
});

test("Testing vechicle validation for color : NewRandomColor#00909 - FALSE", () => {
  expect(vehicleValidation.isValidColor("NewRandomColor#00909")).toBe(false);
});

// valid value and checking for string formated

test("Testing vechicle validation for color : WhitE- TRUE", () => {
  expect(vehicleValidation.isValidColor("WhitE")).toBe(true);
});

test("Testing vechicle validation for color : YeLLOw - TRUE", () => {
  expect(vehicleValidation.isValidColor("WhitE")).toBe(true);
});

// testing vehicle fuel source

// invalid fuel source for vehicle

test("Testing vechicle validation for fuel : DIEselL - FALSE", () => {
  expect(vehicleValidation.isValidFuelSource("DIEselL")).toBe(false);
});

test("Testing vechicle validation for fuel : RandOmFuel12 - FALSE", () => {
  expect(vehicleValidation.isValidFuelSource("RandOmFuel12")).toBe(false);
});

test("Testing vechicle validation for fuel : `@12312$%` - FALSE", () => {
  expect(vehicleValidation.isValidFuelSource("`@12312$%`")).toBe(false);
});

// valid fuel source for vehicle

test("Testing vechicle validation for fuel : DIEsel - TRUE", () => {
  expect(vehicleValidation.isValidFuelSource("DIEsel")).toBe(true);
});

test("Testing vechicle validation for fuel : gasoline - TRUE", () => {
  expect(vehicleValidation.isValidFuelSource("gasoline")).toBe(true);
});

test("Testing vechicle validation for fuel : ElecTric - TRUE", () => {
  expect(vehicleValidation.isValidFuelSource("ElecTric")).toBe(true);
});

// invalid width for vehicle

test(`Testing vechicle validation for width : "2.6" - FALSE`, () => {
  expect(vehicleValidation.isValidWidth("2.6")).toBe(false);
});

test(`Testing vechicle validation for width : 2.7 - FALSE`, () => {
  expect(vehicleValidation.isValidWidth(2.7)).toBe(false);
});

test(`Testing vechicle validation for width : 1.4 - FALSE`, () => {
  expect(vehicleValidation.isValidWidth(1.4)).toBe(false);
});

test(`Testing vechicle validation for width : 3 - FALSE`, () => {
  expect(vehicleValidation.isValidWidth(3)).toBe(false);
});

// valid width for vehicle

test(`Testing vechicle validation for width : 1.5 - TRUE`, () => {
  expect(vehicleValidation.isValidWidth(1.5)).toBe(true);
});

test(`Testing vechicle validation for width : 2.6 - TRUE`, () => {
  expect(vehicleValidation.isValidWidth(2.6)).toBe(true);
});

test(`Testing vechicle validation for width : 1.99 - TRUE`, () => {
  expect(vehicleValidation.isValidWidth(1.99)).toBe(true);
});

// invalid legth for vehicle

test(`Testing vechicle validation for leght : "12" - FALSE`, () => {
  expect(vehicleValidation.isValidLength("12")).toBe(false);
});

test(`Testing vechicle validation for leght : 12.5 - FALSE`, () => {
  expect(vehicleValidation.isValidLength(1.99)).toBe(false);
});

test(`Testing vechicle validation for leght : 4.9 - FALSE`, () => {
  expect(vehicleValidation.isValidLength(4.9)).toBe(false);
});


// valid legth for vehicle

test(`Testing vechicle validation for leght : 5 - TRUE`, () => {
  expect(vehicleValidation.isValidLength(5)).toBe(false);
});

test(`Testing vechicle validation for leght : 40 - TRUE`, () => {
  expect(vehicleValidation.isValidLength(40)).toBe(false);
});

test(`Testing vechicle validation for leght : 25 - TRUE`, () => {
  expect(vehicleValidation.isValidLength(25)).toBe(false);
});

// invalid capacity 

test(`Testing vechicle validation for capacity : "12E" - FALSE`, () => {
  expect(vehicleValidation.isValidWidth("12E")).toBe(false);
});

test(`Testing vechicle validation for capacity : 0.99 - FALSE`, () => {
  expect(vehicleValidation.isValidWidth(0.99)).toBe(false);
});

test(`Testing vechicle validation for capacity : 40.1 - FALSE`, () => {
  expect(vehicleValidation.isValidWidth(40.1)).toBe(false);
});

// valid capacity 

test(`Testing vechicle validation for capacity : "1" - TRUE`, () => {
  expect(vehicleValidation.isValidWidth("1")).toBe(false);
});

test(`Testing vechicle validation for capacity : 40 - TRUE`, () => {
  expect(vehicleValidation.isValidWidth(40)).toBe(false);
});

test(`Testing vechicle validation for capacity : 25 - TRUE`, () => {
  expect(vehicleValidation.isValidWidth(25)).toBe(false);
});
