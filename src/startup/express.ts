import express, { Express } from "express";
import morgan from "morgan";
import config from "../config";
import cors from "cors";

export default function expressLoader(app: Express): void {
  app.use(morgan(config.nodeEnv == "development" ? "dev" : "tiny"));
  app.use(express.json());
  app.use(cors());
  app.get("/status", (req, res) =>
    res.send("Web-Service up and running!").end()
  );
}
