import express, { Router } from "express";
import * as EnergySystemController from "../controllers/EnergySystemController";

export function setEnergySystemRoutes(mainRouter: Router): void {
  const energySystemRouter = express.Router();
  energySystemRouter
    .route("/:energySystemId")
    .get(EnergySystemController.getEnergySystem)
    .patch(EnergySystemController.patchEnergySystem)
    .delete(EnergySystemController.deleteEnergySystem);
  energySystemRouter.route("/").post(EnergySystemController.postEnergySystem);
  energySystemRouter
    .route("/:energySystemId/consumption")
    .post(EnergySystemController.postEnergySystemConsumption);
  mainRouter.use("/energy-system", energySystemRouter);
}
