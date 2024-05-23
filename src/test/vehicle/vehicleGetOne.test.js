const { getAll } = require("../../controllers/vehicle");
const { BadRequestError } = require("../../utils/errors");

describe("get function for vehicle", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      params: { companyId: "123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.NODE_ENV = "test"; // Set the environment to test mode
  });
  it("should return 400 if the companyId is missing", async () => {
    delete req.params.companyId;

    await getAll(req, res, next);

    expect(next).toHaveBeenCalledWith(
      new BadRequestError("Missing company id")
    );
  });
});
