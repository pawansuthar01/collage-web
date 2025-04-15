import { config } from "dotenv";
config();
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

import axios from "axios";
import dataBaseConnection from "./config/dbConncetion.js";
import UserRouter from "./Routers/UserRouter.js";
import Admin from "./Routers/AdminRouter.js";
import ErrorMiddleware from "./Middleware/Error.Middleware.js";

const app = express();

dataBaseConnection();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Set-Cookie"
  );
  next();
});
// handel server ping to 30s to up//
setInterval(async () => {
  try {
    // await axios.get(`${process.env.Backend_URL}/ping`);
  } catch (error) {
    console.error("Error pinging server:", error.message);
  }
}, 10000);
app.get("/ping", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "pong...",
  });
});
app.use("/collage/v3/user", UserRouter);
app.use("/collage/v5/Admin", Admin);

app.use("*", (req, res, next) => {
  res.status(404).send("Oops ! page not found..");
});
app.use(ErrorMiddleware);
export default app;
