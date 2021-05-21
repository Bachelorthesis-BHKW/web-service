import express, { Router } from "express";
import * as EnergySystemController from "../controllers/EnergySystemController";
import { authenticateToken } from "../middleware/authenticateToken";
import { matchEnergySystemId } from "../middleware/matchEnergySystemId";
import { matchESComponentId } from "../middleware/matchESComponentId";

export function setEnergySystemRoutes(mainRouter: Router): void {
  const energySystemRouter = express.Router();
  energySystemRouter
    .route("/:energySystemId")
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystem)
    .patch(EnergySystemController.patchEnergySystem)
    .delete(EnergySystemController.deleteEnergySystem);
  energySystemRouter.route("/").post(EnergySystemController.postEnergySystem);

  energySystemRouter
    .route("/:energySystemId/consumptions")
    .all(matchEnergySystemId)
    .post(EnergySystemController.postEnergySystemConsumption);

  energySystemRouter
    .route("/:energySystemId/schedule")
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystemSchedule);

  energySystemRouter
    .route("/:energySystemId/components")
    .all(matchEnergySystemId)
    .post(EnergySystemController.postEnergySystemComponent);
  energySystemRouter
    .route("/:energySystemId/components/:esComponentId")
    .all(matchEnergySystemId)
    .all(matchESComponentId)
    .get(EnergySystemController.getEnergySystemComponent)
    .patch(EnergySystemController.patchEnergySystemComponent)
    .delete(EnergySystemController.deleteEnergySystemComponent);
  energySystemRouter
    .route("/:energySystemId/components/:esComponentId/currents")
    .all(matchEnergySystemId)
    .all(matchESComponentId)
    .post(EnergySystemController.postEnergySystemComponentCurrent);

  mainRouter.use("/energy-systems", authenticateToken, energySystemRouter);
}
