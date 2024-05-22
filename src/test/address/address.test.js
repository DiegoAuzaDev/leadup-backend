const addresValidation = require("../../utils/googleMaps");

describe("Testing the addres validation function", () => {
  it("Given a valid address and region", async () => {
    const testAddress = "Carrera 1H # 6 - 14, Neiva - Huila";
    const region = "CO";
    const response = await addresValidation.googleMapValidation(
      testAddress,
      region
    );
    const expectedResponse =
      "Carrera 1h #6 - 14, Neiva, Huila, 410010, Colombia";

    expect(response.formattedAddress).toBe(expectedResponse);
  });
  it("Given an invalid addres and region", async () => {
    const invalidAddress = "#$#$34";
    const region = "!@#!@#!@";
    try {
      const response = await addresValidation.googleMapValidation(
        invalidAddress,
        region
      );
    } catch (error) {
      expect(error.name).toEqual("BadRequestError");
      expect(error.status).toEqual(400);
    }
  });
});
