import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";

const app = express();

// Middlewares

app.use(
  cors({
    origin: "http://localhost:3000/",
  })
);
app.use(json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 request per `window` (here, per 15 minutes)
  })
);

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
