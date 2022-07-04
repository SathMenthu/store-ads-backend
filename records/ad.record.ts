import { AdEntity, NewAddEntity, SimpleAdEntity } from "../types";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import { FieldPacket } from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
  public id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;
  constructor(obj: NewAddEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        "Ad name cannot be empty or more than 100 characters"
      );
    }

    if (obj.description.length > 999) {
      throw new ValidationError(
        "Ad description cannot be empty or more than 999 characters"
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
      throw new ValidationError("We cannot locate address of ad");
    }

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async findOne(id: string): Promise<AdRecord | null> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE id = :id",
      {
        id,
      }
    )) as AdRecordResults;

    return results.length === 0 ? null : new AdRecord(results[0]);
  }
  static async create(newRecord: NewAddEntity) {
    const { id, name, description, price, url, lat } = newRecord;
    const [results] = (await pool.execute(
      "INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)",
      this
    )) as AdRecordResults;

    return results.length === 0 ? null : new AdRecord(results[0]);
  }

  static async findAll(name: string): Promise<SimpleAdEntity[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `ads` WHERE `name` LIKE :search",
      {
        search: `%${name}%`,
      }
    )) as AdRecordResults;

    return results.map((result) => {
      const { id, lat, lon } = result;
      return { id, lat, lon };
    });
  }
}
