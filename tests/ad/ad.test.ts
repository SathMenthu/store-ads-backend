import { AdRecord } from "../../records/ad.record";
import { pool } from "../../utils/db";
import { AdEntity } from "../../types";

const defaultObj = {
  name: "[test] Testowy",
  description: "Test",
  price: 0,
  url: "https://www.test.com/",
  lat: 0,
  lon: 0,
};

afterAll(async () => {
  await pool.end();
});

test("AdRecord.create inserts data to database", async () => {
  const ad = new AdRecord(defaultObj);
  await ad.insert();

  expect(ad.id).toBeDefined();
});

test("AdRecord.create returns uuid after create an record", async () => {
  const ad = new AdRecord(defaultObj);
  await ad.insert();

  const foundRecord = await AdRecord.findOne(ad.id);

  expect(foundRecord).toBeDefined();
  expect(foundRecord.id).toBe(ad.id);
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

test("AdRecord returns array of found entries.", async () => {
  const ads = await AdRecord.findAll("");
  expect(ads).not.toEqual([]);
  expect(ads[0]).toBeDefined();
});

test("AdRecord returns empty array when searching something that doesnt exist", async () => {
  const ads = await AdRecord.findAll("ab---!");
  expect(ads).toEqual([]);
});

test("AdRecord returns small amount of data", async () => {
  const ads = await AdRecord.findAll("HEXEM");
  expect((ads[0] as AdEntity).price).toBeUndefined();
});
