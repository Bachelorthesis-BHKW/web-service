import { RequestHandler } from "express";

export enum EnergySystemRoutes {
  post,
  idGet,
  idPatch,
  idDelete,
  idConsumptionsPost,
  idSchedulePost,
  idScheduleGet,
  idScheduleNowGet,
}

export function getEnergySystemValidationSetForRoute(
  route: EnergySystemRoutes
): RequestHandler[] {
  let set: RequestHandler[];
  switch (route) {
    case EnergySystemRoutes.post:
      set = [];
      break;
    case EnergySystemRoutes.idGet:
      set = [];
      break;
    case EnergySystemRoutes.idPatch:
      set = [];
      break;
    case EnergySystemRoutes.idDelete:
      set = [];
      break;
    case EnergySystemRoutes.idConsumptionsPost:
      set = [];
      break;
    case EnergySystemRoutes.idSchedulePost:
      set = [];
      break;
    case EnergySystemRoutes.idScheduleGet:
      set = [];
      break;
    case EnergySystemRoutes.idScheduleNowGet:
      set = [];
      break;
    default:
      set = [];
  }
  return set;
}
