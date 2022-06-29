import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError } from "./utils/errors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);

app.use(json());

// Routes

app.get("/", async (req, res) => {
  throw new Error("Erorr xd");
});

// Error Handler

app.use(handleError);

app.listen(3001, "0.0.0.0", () => {
  console.log("App listening on port 3001");
});
