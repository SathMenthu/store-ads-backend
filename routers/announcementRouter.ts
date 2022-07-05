import { Router } from "express";
import { AnnouncementRecord } from "../records/announcementRecord";

export const announcementRouter = Router()
  .get("/search/:name?", async (req, res) => {
    try {
      const announcements = await AnnouncementRecord.findAll(
        req.params.name ?? ""
      );
      res.json({
        announcements,
      });
    } catch (e) {
      console.log(e);
    }
  })
  .get("/:id", async (req, res) => {
    const announcement = await AnnouncementRecord.findOne(req.params.id);
    res.json(announcement);
  })
  .post("/", async (req, res) => {
    const announcement = new AnnouncementRecord(req.body);
    await announcement.insert();

    res.json(announcement);
  });
