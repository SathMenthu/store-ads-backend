import { AnnouncementRecord } from "../../records/announcementRecord";
import { pool } from "../../utils/db";
import { AnnouncementEntity } from "../../types";

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

test("AnnouncementRecord.create inserts data to database", async () => {
  const announcement = new AnnouncementRecord(defaultObj);
  await announcement.insert();

  expect(announcement.id).toBeDefined();
});

test("AnnouncementRecord.create returns uuid after create an record", async () => {
  const announcement = new AnnouncementRecord(defaultObj);
  await announcement.insert();

  const foundRecord = await AnnouncementRecord.findOne(announcement.id);

  expect(foundRecord).toBeDefined();
  expect(foundRecord.id).toBe(announcement.id);
});

test("AnnouncementRecord returns data from database for one entry.", async () => {
  const announcement = await AnnouncementRecord.findOne("1");

  expect(announcement).toBeDefined();
  expect(announcement.id).toBe("1");
  expect(announcement.description).not.toBe(null);
});

test("AnnouncementRecord returns null from database for unexciting entry.", async () => {
  const announcement = await AnnouncementRecord.findOne("test");
  expect(announcement).toBeNull();
});

test("AnnouncementRecord returns array of found entries.", async () => {
  const announcements = await AnnouncementRecord.findAll("");
  expect(announcements).not.toEqual([]);
  expect(announcements[0]).toBeDefined();
});

test("AnnouncementRecord returns empty array when searching something that doesnt exist", async () => {
  const announcements = await AnnouncementRecord.findAll("ab---!");
  expect(announcements).toEqual([]);
});

test("AnnouncementRecord returns small amount of data", async () => {
  const announcements = await AnnouncementRecord.findAll("HEXEM");
  expect((announcements[0] as AnnouncementEntity).price).toBeUndefined();
});
