import { RequestHandler } from "express";
import { validate } from "../../middleware/validate";
import { body, param } from "express-validator";
import {
  AlgorithmTrigger,
  nameOfEnergySystem,
} from "../../models/EnergySystem";
import { nameOfESConsumption } from "../../models/ESConsumption";

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
      set = [...energySystemCreateSet];
      break;
    case EnergySystemRoutes.idGet:
      set = [...energySystemIdSet];
      break;
    case EnergySystemRoutes.idPatch:
      set = [...energySystemIdSet, ...energySystemCreateSet];
      break;
    case EnergySystemRoutes.idDelete:
      set = [...energySystemIdSet];
      break;
    case EnergySystemRoutes.idConsumptionsPost:
      set = [...energySystemIdSet, ...esConsumptionCreateSet];
      break;
    case EnergySystemRoutes.idSchedulePost:
      set = [...energySystemIdSet];
      break;
    case EnergySystemRoutes.idScheduleGet:
      set = [...energySystemIdSet];
      break;
    case EnergySystemRoutes.idScheduleNowGet:
      set = [...energySystemIdSet];
      break;
    default:
      set = [];
  }
  set.push(validate);
  return set;
}

export const energySystemIdSet = [param("energySystemId").exists().isInt()];

const arrayWildcard = "*.";
const esConsumptionCreateSet = [
  body().isArray({ min: 1 }),
  body(arrayWildcard + nameOfESConsumption((esc) => esc.date))
    .exists()
    .isISO8601(),
  body(arrayWildcard + nameOfESConsumption((esc) => esc.verbrauchStrom))
    .exists()
    .isNumeric(),
  body(arrayWildcard + nameOfESConsumption((esc) => esc.verbrauchHeizung))
    .exists()
    .isNumeric(),
  body(arrayWildcard + nameOfESConsumption((esc) => esc.verbrauchBww))
    .exists()
    .isNumeric(),
  body(arrayWildcard + nameOfESConsumption((esc) => esc.aussentemperatur))
    .exists()
    .isNumeric(),
];

const energySystemCreateSet = [
  body(nameOfEnergySystem((es) => es.name))
    .exists()
    .isString(),
  body(nameOfEnergySystem((es) => es.nFahrplan))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.untermengeNFahrplan))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.optimierungshorizontMin))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.optimierungsgroesse))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.deltaT))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.stetigkeitsfaktor))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.prognosemethodeTh))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.qThZaehlerGesamt))
    .exists()
    .isBoolean(),
  body(nameOfEnergySystem((es) => es.qThZaehlerGetrennt))
    .exists()
    .isBoolean(),
  body(nameOfEnergySystem((es) => es.gewichtungsfaktorZufall))
    .exists()
    .isNumeric(),
  body(nameOfEnergySystem((es) => es.algorithmTrigger))
    .exists()
    .isIn(Object.values(AlgorithmTrigger)),
  body(nameOfEnergySystem((es) => es.cronTriggerTime))
    .optional()
    .isString(),
  body(nameOfEnergySystem((es) => es.consumptionPostIntervalMin))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.maxHistoryDays))
    .exists()
    .isInt(),
  body(nameOfEnergySystem((es) => es.latitude))
    .exists()
    .isNumeric(),
  body(nameOfEnergySystem((es) => es.longitude))
    .exists()
    .isNumeric(),
];
