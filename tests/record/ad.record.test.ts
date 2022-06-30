import { AdRecord } from "../../records/ad.record";
import { ValidationError } from "../../utils/errors";

const defaultObj = {
  name: "Test Name",
  description: "Test",
  url: "http://localhost:80/",
  price: 1,
  lat: 9,
  lon: 8,
};

test("Can build AdRecord", () => {
  const ad = new AdRecord(defaultObj);

  expect(ad.name).toBe("Test Name");
  expect(ad.lat).not.toBe(10);
});

test("Validates invalid price", () => {
  expect(() => new AdRecord({ ...defaultObj, price: -1 })).toThrow(
    "Price cannot be negative or greater than 9999999"
  );
});
