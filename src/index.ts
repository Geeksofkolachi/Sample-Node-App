// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { indexRouter } from "./routes";
import connectDB from "./config/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript + MongoDB + Google OAuth Server");
});

app.use("/v1", indexRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
