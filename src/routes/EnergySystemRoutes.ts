import express, { Router } from "express";
import * as ESComponentController from "../controllers/ESComponentController";
import * as EnergySystemController from "../controllers/EnergySystemController";
import { matchEnergySystemId } from "../middleware/matchEnergySystemId";
import { matchESComponentId } from "../middleware/matchESComponentId";
import { authenticate, authenticateJWT } from "../middleware/authentification";
import {
  EnergySystemRoutes,
  getEnergySystemValidationSetForRoute,
} from "./express-validator_sets/getEnergySystemValidationSetForRoute";
import {
  ESComponentRoutes,
  getESComponentValidationSetForRoute,
} from "./express-validator_sets/getESComponentValidationSetForRoute";

export function setEnergySystemRoutes(mainRouter: Router): void {
  const energySystemRouter = express.Router();
  energySystemRouter
    .route("/:energySystemId")
    .all(authenticateJWT)
    .all(matchEnergySystemId)
    .get(
      getEnergySystemValidationSetForRoute(EnergySystemRoutes.idGet),
      EnergySystemController.getEnergySystem
    )
    .patch(
      getEnergySystemValidationSetForRoute(EnergySystemRoutes.idPatch),
      EnergySystemController.patchEnergySystem
    )
    .delete(
      getEnergySystemValidationSetForRoute(EnergySystemRoutes.idDelete),
      EnergySystemController.deleteEnergySystem
    );

  energySystemRouter
    .route("/")
    .all(authenticateJWT)
    .get(EnergySystemController.getEnergySystems)
    .post(
      getEnergySystemValidationSetForRoute(EnergySystemRoutes.post),
      EnergySystemController.postEnergySystem
    );

  energySystemRouter
    .route("/:energySystemId/consumptions")
    .all(authenticate)
    .all(matchEnergySystemId)
    .post(
      getEnergySystemValidationSetForRoute(
        EnergySystemRoutes.idConsumptionsPost
      ),
      EnergySystemController.postEnergySystemConsumption
    );

  energySystemRouter
    .route("/:energySystemId/schedule")
    .all(authenticate)
    .all(matchEnergySystemId)
    .get(
      getEnergySystemValidationSetForRoute(EnergySystemRoutes.idScheduleGet),
      EnergySystemController.getEnergySystemSchedule
    )
    .post(
      getEnergySystemValidationSetForRoute(EnergySystemRoutes.idSchedulePost),
      EnergySystemController.postEnergySystemSchedule
    );

  energySystemRouter
    .route("/:energySystemId/schedule/now")
    .all(authenticate)
    .all(matchEnergySystemId)
    .get(
      getEnergySystemValidationSetForRoute(EnergySystemRoutes.idScheduleNowGet),
      EnergySystemController.getEnergySystemScheduleNow
    );

  energySystemRouter
    .route("/:energySystemId/components")
    .all(authenticateJWT)
    .all(matchEnergySystemId)
    .get(
      getESComponentValidationSetForRoute(ESComponentRoutes.get),
      ESComponentController.getEnergySystemComponents
    )
    .post(
      getESComponentValidationSetForRoute(ESComponentRoutes.post),
      ESComponentController.postEnergySystemComponent
    );

  energySystemRouter
    .route("/:energySystemId/components/:esComponentId")
    .all(authenticateJWT)
    .all(matchEnergySystemId)
    .all(matchESComponentId)
    .get(
      getESComponentValidationSetForRoute(ESComponentRoutes.idGet),
      ESComponentController.getEnergySystemComponentId
    )
    .patch(
      getESComponentValidationSetForRoute(ESComponentRoutes.idPatch),
      ESComponentController.patchEnergySystemComponent
    )
    .delete(
      getESComponentValidationSetForRoute(ESComponentRoutes.idDelete),
      ESComponentController.deleteEnergySystemComponent
    );

  energySystemRouter
    .route("/:energySystemId/components/:esComponentId/currents")
    .all(authenticate)
    .all(matchEnergySystemId)
    .all(matchESComponentId)
    .post(
      getESComponentValidationSetForRoute(ESComponentRoutes.idCurrentsPost),
      ESComponentController.postEnergySystemComponentCurrent
    );

  mainRouter.use("/energy-systems", energySystemRouter);
}
