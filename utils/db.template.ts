import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "your user name",
  password: "your password",
  database: "your database name",
  namedPlaceholders: true,
  decimalNumbers: true,
});
