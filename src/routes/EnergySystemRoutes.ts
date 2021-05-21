import express, { Router } from "express";
import * as EnergySystemController from "../controllers/EnergySystemController";
import { authenticateToken } from "../middleware/authenticateToken";

export function setEnergySystemRoutes(mainRouter: Router): void {
  const energySystemRouter = express.Router();
  energySystemRouter.use(authenticateToken);
  energySystemRouter
    .route("/:energySystemId")
    .get(EnergySystemController.getEnergySystem)
    .patch(EnergySystemController.patchEnergySystem)
    .delete(EnergySystemController.deleteEnergySystem);
  energySystemRouter.route("/").post(EnergySystemController.postEnergySystem);

  energySystemRouter
    .route("/:energySystemId/consumptions")
    .post(EnergySystemController.postEnergySystemConsumption);

  energySystemRouter
    .route("/:energySystemId/schedule")
    .get(EnergySystemController.getEnergySystemSchedule);

  energySystemRouter
    .route("/:energySystemId/components")
    .post(EnergySystemController.postEnergySystemComponent);
  energySystemRouter
    .route("/:energySystemId/components/:esComponentId")
    .get(EnergySystemController.getEnergySystemComponent)
    .patch(EnergySystemController.patchEnergySystemComponent)
    .delete(EnergySystemController.deleteEnergySystemComponent);
  energySystemRouter
    .route("/:energySystemId/components/:esComponentId/currents")
    .post(EnergySystemController.postEnergySystemComponentCurrent);

  mainRouter.use("/energy-systems", energySystemRouter);
}
