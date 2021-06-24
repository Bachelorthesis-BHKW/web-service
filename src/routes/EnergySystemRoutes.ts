import express, { Router } from "express";
import * as EnergySystemController from "../controllers/EnergySystemController";
import { authenticateToken } from "../middleware/authenticateToken";
import { matchEnergySystemId } from "../middleware/matchEnergySystemId";
import { matchESComponentId } from "../middleware/matchESComponentId";
import { authenticateBasicAuth } from "../middleware/authenticateBasicAuth";

export function setEnergySystemRoutes(mainRouter: Router): void {
  const energySystemRouter = express.Router();
  energySystemRouter
    .route("/:energySystemId")
    .all(authenticateToken)
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystem)
    .patch(EnergySystemController.patchEnergySystem)
    .delete(EnergySystemController.deleteEnergySystem);
  energySystemRouter.route("/").post(EnergySystemController.postEnergySystem);

  energySystemRouter
    .route("/:energySystemId/consumptions")
    .all(authenticateBasicAuth)
    .all(matchEnergySystemId)
    .post(EnergySystemController.postEnergySystemConsumption);

  energySystemRouter
    .route("/:energySystemId/schedule")
    .all(authenticateToken)
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystemSchedule)
    .post(EnergySystemController.postEnergySystemSchedule);

  energySystemRouter
    .route("/:energySystemId/schedule/now")
    .all(authenticateToken)
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystemScheduleNow);

  energySystemRouter
    .route("/:energySystemId/components")
    .all(authenticateToken)
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystemComponents)
    .post(EnergySystemController.postEnergySystemComponent);
  energySystemRouter
    .route("/:energySystemId/components/:esComponentId")
    .all(authenticateToken)
    .all(matchEnergySystemId)
    .all(matchESComponentId)
    .get(EnergySystemController.getEnergySystemComponentId)
    .patch(EnergySystemController.patchEnergySystemComponent)
    .delete(EnergySystemController.deleteEnergySystemComponent);
  energySystemRouter
    .route("/:energySystemId/components/:esComponentId/currents")
    .all(authenticateBasicAuth)
    .all(matchEnergySystemId)
    .all(matchESComponentId)
    .post(EnergySystemController.postEnergySystemComponentCurrent);

  mainRouter.use("/energy-systems", energySystemRouter);
}
