const { create } = require("../../controllers/delivery");
const { BadRequestError } = require("../../utils/errors");

describe("create function for delivery", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        companyId: "123123123",
      },
      sanitizedBody: [1, 1, 1, 1, 1, 1],
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.NODE_ENV = "test"; // Set the environment to test mode
  });

  it("should return 400 is there is no company ID ", async () => {
    delete req.params.companyId;

    await create(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new BadRequestError("Missing company id")
    );
  });

  it("should return 400 is there is no sanitizedBody ", async ()=>{
    delete req.sanitizedBody

    await create(req, res, next)
       expect(next).toHaveBeenCalledWith(
         new BadRequestError("Missing list of deliveries")
       );
  });
});
