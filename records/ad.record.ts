import { AdEntity } from "../types";
import { ValidationError } from "../utils/errors";

interface NedAddEntity extends Omit<AdEntity, "id"> {
  id?: string;
}

export class AdRecord implements AdEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;

  constructor(obj: AdEntity) {
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

    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }
}
