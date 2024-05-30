const { create } = require("../../controllers/delivery");
const { BadRequestError } = require("../../utils/errors");

describe("create function for delivery", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        companyId: "123123123",
      },
      sanitizedBody: [true, true, true, true, true],
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.NODE_ENV = "test"; // Set the environment to test mode
  });

  it("should return 400 if there is no company ID ", async () => {
    delete req.params.companyId;

    await create(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new BadRequestError("Missing company id")
    );
  });

  it("should return 400 if there is no sanitizedBody ", async () => {
    delete req.sanitizedBody;

    await create(req, res, next);
    expect(next).toHaveBeenCalledWith(
      new BadRequestError("Missing list of deliveries")
    );
  });

  it("should return 201 if there is no invalid input", async () => {
    await create(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "OK",
        message: "Processing completed",
        validIndex: expect.any(Array),
        invalidIndex: expect.any(Array),
      })
    );
  });

  it("should return 200 if there is invalid input", async () => {
    req.sanitizedBody[0] = false;
    req.sanitizedBody[req.sanitizedBody.length - 1] = false;
    await create(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "OK",
        message: "Processing completed with some errors.",
        validIndex: expect.any(Array),
        invalidIndex: expect.any(Array),
      })
    );
  });
});
