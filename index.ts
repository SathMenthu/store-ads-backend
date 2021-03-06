import express, { json, Router } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError } from "./utils/errors";
import rateLimit from "express-rate-limit";
import { announcementRouter } from "./routers/announcementRouter";
import { config } from "./config/config";

const app = express();

// Middlewares

app.use(
  cors({
    origin: config.corsOrigin,
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

const router = Router();

router.use("/announcements", announcementRouter);

app.use("/api", router);

// Error Handler
app.use(handleError);

// Launch

app.listen(3001, "0.0.0.0", () => {
  console.log("App listening on port 3001");
});
