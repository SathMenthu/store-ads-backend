import { AdRecord } from "../../records/ad.record";

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
