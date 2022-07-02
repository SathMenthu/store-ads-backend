import { AdRecord } from "../../records/ad.record";

test("Can add new Record to AdRecord", async () => {
  const ad = await AdRecord.create({
    name: "Testowy",
    description: "Test",
    price: 0,
    url: "https://www.test.com/",
    lat: 0,
    lon: 0,
  });

  console.log(ad);

  expect(ad.id).toHaveLength(Number(ad.id));
});

test("AdRecord returns data from database for one entry.", async () => {
  const ad = await AdRecord.findOne("1");

  expect(ad).toBeDefined();
  expect(ad.id).toBe("1");
  expect(ad.description).not.toBe(null);
});

test("AdRecord returns null from database for unexistent entry.", async () => {
  const ad = await AdRecord.findOne("test");
  expect(ad).toBeNull();
});
