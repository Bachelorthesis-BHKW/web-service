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
      set = [...energySystemIdSet, ...energySystemPatchSet];
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
    .isInt({ min: 1 }),
  body(nameOfEnergySystem((es) => es.maxHistoryDays))
    .exists()
    .isInt({ min: 1 }),
  body(nameOfEnergySystem((es) => es.latitude))
    .exists()
    .isNumeric(),
  body(nameOfEnergySystem((es) => es.longitude))
    .exists()
    .isNumeric(),
];

const energySystemPatchSet = [
  body(nameOfEnergySystem((es) => es.name))
    .optional()
    .isString(),
  body(nameOfEnergySystem((es) => es.nFahrplan))
    .optional()
    .isInt(),
  body(nameOfEnergySystem((es) => es.untermengeNFahrplan))
    .optional()
    .isInt(),
  body(nameOfEnergySystem((es) => es.optimierungshorizontMin))
    .optional()
    .isInt(),
  body(nameOfEnergySystem((es) => es.optimierungsgroesse))
    .optional()
    .isInt(),
  body(nameOfEnergySystem((es) => es.deltaT))
    .optional()
    .isInt(),
  body(nameOfEnergySystem((es) => es.stetigkeitsfaktor))
    .optional()
    .isInt(),
  body(nameOfEnergySystem((es) => es.prognosemethodeTh))
    .optional()
    .isInt(),
  body(nameOfEnergySystem((es) => es.qThZaehlerGesamt))
    .optional()
    .isBoolean(),
  body(nameOfEnergySystem((es) => es.qThZaehlerGetrennt))
    .optional()
    .isBoolean(),
  body(nameOfEnergySystem((es) => es.gewichtungsfaktorZufall))
    .optional()
    .isNumeric(),
  body(nameOfEnergySystem((es) => es.algorithmTrigger))
    .optional()
    .isIn(Object.values(AlgorithmTrigger)),
  body(nameOfEnergySystem((es) => es.cronTriggerTime))
    .optional()
    .isString(),
  body(nameOfEnergySystem((es) => es.consumptionPostIntervalMin))
    .optional()
    .isInt({ min: 1 }),
  body(nameOfEnergySystem((es) => es.maxHistoryDays))
    .optional()
    .isInt({ min: 1 }),
  body(nameOfEnergySystem((es) => es.latitude))
    .optional()
    .isNumeric(),
  body(nameOfEnergySystem((es) => es.longitude))
    .optional()
    .isNumeric(),
];
