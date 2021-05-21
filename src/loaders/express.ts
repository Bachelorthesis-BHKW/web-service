import express, { Express } from "express";
import morgan from "morgan";
import config from "../config";

export default function expressLoader(app: Express): void {
  app.use(morgan(config.nodeEnv == "development" ? "dev" : "tiny"));
  app.use(express.json());
  app.get("/status", (req, res) => res.status(200).end());
}
