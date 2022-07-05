import { AnnouncementRecord } from "../../records/announcementRecord";

const defaultObj = {
  id: "test__",
  name: "Test Name",
  description: "Test",
  url: "http://localhost:80/",
  price: 1,
  lat: 9,
  lon: 8,
};

test("Can build AnnouncementRecord", () => {
  const announcement = new AnnouncementRecord(defaultObj);

  expect(announcement.name).toBe("Test Name");
  expect(announcement.lat).not.toBe(10);
});

test("Validates invalid price", () => {
  expect(() => new AnnouncementRecord({ ...defaultObj, price: -1 })).toThrow(
    "Price cannot be negative or greater than 9999999"
  );
});
