import express, { Express, Router } from "express";
import { setUserRoutes } from "../routes/UserRoutes";
import { setEnergySystemRoutes } from "../routes/EnergySystemRoutes";

export default function routesLoader(app: Express): void {
  const router: Router = express.Router();
  setUserRoutes(router);
  setEnergySystemRoutes(router);
  app.use("/api/v1", router);
}
