import express, { Express, Router } from "express";
import { setUserRoutes } from "../routes/UserRoutes";

export default function routesLoader(app: Express): void {
  const router: Router = express.Router();
  setUserRoutes(router);
  app.use("/api/v1", router);
}
