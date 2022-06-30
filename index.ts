import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError } from "./utils/errors";

const app = express();

// Middlewares

app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);
app.use(json());

// Routes

app.get("/", async (req, res) => {
  res.send("hi");
});

// Error Handler
app.use(handleError);

// Launch

app.listen(3001, "0.0.0.0", () => {
  console.log("App listening on port 3001");
});
