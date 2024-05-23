// createController.test.js
const { create } = require("../../controllers/vehicle"); // Adjust the path accordingly
const { BadRequestError } = require("../../utils/errors"); // Adjust the path to your error handling

// Mock isValidVehicle module
jest.mock("../../middleware/isValidVehicle", () => ({
  isValidBrand: jest.fn(),
  isValidColor: jest.fn(),
  isValidFuelSource: jest.fn(),
  isValidWidth: jest.fn(),
  isValidLength: jest.fn(),
  isValidCapacity: jest.fn(),
}));

const isValidVehicle = require("../../middleware/isValidVehicle"); // Adjust the path accordingly

describe("create function for vehicle", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: { companyId: "123" },
      sanitizedBody: {
        brand: "Toyota",
        model: "Corolla",
        year: 2020,
        width: 70,
        length: 150,
        color: "Red",
        description: "A nice car",
        fuel: "Petrol",
        plateNumber: "XYZ123",
        capacity: 5,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.NODE_ENV = "test"; // Set the environment to test mode
  });

  it("should return 400 if companyId is missing", async () => {
    delete req.params.companyId;

    await create(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new BadRequestError("Missing company id")
    );
  });

  it("should return 400 if brand is invalid", async () => {
    isValidVehicle.isValidBrand.mockReturnValue(false);

    await create(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new BadRequestError("Invalid values for : brand")
    );
  });

  // Additional test cases for other validations can be added here similarly

  it("should return 201 with sanitized body if all validations pass", async () => {
    isValidVehicle.isValidBrand.mockReturnValue(true);
    isValidVehicle.isValidColor.mockReturnValue(true);
    isValidVehicle.isValidFuelSource.mockReturnValue(true);
    isValidVehicle.isValidWidth.mockReturnValue(true);
    isValidVehicle.isValidLength.mockReturnValue(true);
    isValidVehicle.isValidCapacity.mockReturnValue(true);

    await create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.sanitizedBody);
  });

  // Add more tests as needed for other validation and error cases
});
