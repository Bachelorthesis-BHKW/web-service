import express, { Router } from "express";
import * as ESComponentController from "../controllers/ESComponentController";
import * as EnergySystemController from "../controllers/EnergySystemController";
import { matchEnergySystemId } from "../middleware/matchEnergySystemId";
import { matchESComponentId } from "../middleware/matchESComponentId";
import { authenticate, authenticateJWT } from "../middleware/authentification";

export function setEnergySystemRoutes(mainRouter: Router): void {
  const energySystemRouter = express.Router();
  energySystemRouter
    .route("/:energySystemId")
    .all(authenticateJWT)
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystem)
    .patch(EnergySystemController.patchEnergySystem)
    .delete(EnergySystemController.deleteEnergySystem);
  energySystemRouter
    .route("/")
    .all(authenticateJWT)
    .post(EnergySystemController.postEnergySystem);

  energySystemRouter
    .route("/:energySystemId/consumptions")
    .all(authenticate)
    .all(matchEnergySystemId)
    .post(EnergySystemController.postEnergySystemConsumption);

  energySystemRouter
    .route("/:energySystemId/schedule")
    .all(authenticate)
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystemSchedule)
    .post(EnergySystemController.postEnergySystemSchedule);

  energySystemRouter
    .route("/:energySystemId/schedule/now")
    .all(authenticate)
    .all(matchEnergySystemId)
    .get(EnergySystemController.getEnergySystemScheduleNow);

  energySystemRouter
    .route("/:energySystemId/components")
    .all(authenticateJWT)
    .all(matchEnergySystemId)
    .get(ESComponentController.getEnergySystemComponents)
    .post(ESComponentController.postEnergySystemComponent);
  energySystemRouter
    .route("/:energySystemId/components/:esComponentId")
    .all(authenticateJWT)
    .all(matchEnergySystemId)
    .all(matchESComponentId)
    .get(ESComponentController.getEnergySystemComponentId)
    .patch(ESComponentController.patchEnergySystemComponent)
    .delete(ESComponentController.deleteEnergySystemComponent);
  energySystemRouter
    .route("/:energySystemId/components/:esComponentId/currents")
    .all(authenticate)
    .all(matchEnergySystemId)
    .all(matchESComponentId)
    .post(ESComponentController.postEnergySystemComponentCurrent);

  mainRouter.use("/energy-systems", energySystemRouter);
}
