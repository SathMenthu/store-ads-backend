import {
  AnnouncementEntity,
  NewAnnouncementEntity,
  SimpleAnnouncementEntity,
} from "../types";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";
import { v4 as uuid } from "uuid";

type AnnouncementRecordResults = [AnnouncementEntity[], FieldPacket[]];

export class AnnouncementRecord implements AnnouncementEntity {
  public id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;
  constructor(obj: NewAnnouncementEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "Announcement name cannot be empty or more than 100 characters"
      );
    }

    if (obj.description.length > 999) {
      throw new ValidationError(
        "Announcement description cannot be empty or more than 999 characters"
      );
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        "Price cannot be negative or greater than 9999999"
      );
    }

    // @TODO: Check if URL is valid!
    if (obj.url.length > 100) {
      throw new ValidationError(
        "URL address cannot be empty or more than 100 characters"
      );
    }

    if (typeof obj.lat !== "number" || typeof obj.lon !== "number") {
      throw new ValidationError("We cannot locate address of announcement");
    }

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async findOne(id: string): Promise<AnnouncementRecord | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `announcements` WHERE id = :id",
      {
        id,
      }
    )) as AnnouncementRecordResults;

    return results.length === 0 ? null : new AnnouncementRecord(results[0]);
  }
  static async findAll(name: string): Promise<SimpleAnnouncementEntity[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `announcements` WHERE `name` LIKE :search",
      {
        search: `%${name}%`,
      }
    )) as AnnouncementRecordResults;

    return results.map((result) => {
      const { id, lat, lon } = result;
      return { id, lat, lon };
    });
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error("Cannot insert something that is already inserted!");
    }

    await pool.execute(
      "INSERT INTO `announcements`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)",
      this
    );
  }
}
