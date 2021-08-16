import { RequestHandler } from "express";
import { validate } from "../../middleware/validate";
import { body, param } from "express-validator";
import { nameOfESComponent } from "../../models/ESComponent";
import { ESComponentType } from "../../es_components/ESComponentType";
import { energySystemIdSet } from "./getEnergySystemValidationSetForRoute";
import { nameOfESComponentCurrent } from "../../models/ESComponentCurrent";

export enum ESComponentRoutes {
  post,
  get,
  idGet,
  idPatch,
  idDelete,
  idCurrentsPost,
}

export function getESComponentValidationSetForRoute(
  route: ESComponentRoutes
): RequestHandler[] {
  let set: RequestHandler[];
  switch (route) {
    case ESComponentRoutes.post:
      set = [...energySystemIdSet, ...esComponentCreateSet];
      break;
    case ESComponentRoutes.get:
      set = [...energySystemIdSet];
      break;
    case ESComponentRoutes.idGet:
      set = [...energySystemIdSet, ...esComponentIdSet];
      break;
    case ESComponentRoutes.idPatch:
      set = [...energySystemIdSet, ...esComponentIdSet, ...esComponentPatchSet];
      break;
    case ESComponentRoutes.idDelete:
      set = [...energySystemIdSet, ...esComponentIdSet];
      break;
    case ESComponentRoutes.idCurrentsPost:
      set = [
        ...energySystemIdSet,
        ...esComponentIdSet,
        ...esComponentCurrentCreateSet,
      ];
      break;
    default:
      set = [];
  }
  set.push(validate);
  return set;
}

const esComponentIdSet = [param("esComponentId").exists().isInt()];

const esComponentCreateSet = [
  body(nameOfESComponent((esc) => esc.type))
    .exists()
    .isIn(Object.values(ESComponentType)),
  body(nameOfESComponent((esc) => esc.name))
    .exists()
    .isString(),
  body(nameOfESComponent((esc) => esc.kenngroessen)).exists(),
  body(nameOfESComponent((esc) => esc.currentsPostIntervalMin))
    .exists()
    .isInt({ min: 1 }),
  body(nameOfESComponent((esc) => esc.maxHistoryDays))
    .exists()
    .isInt({ min: 1 }),
];

const esComponentPatchSet = [
  body(nameOfESComponent((esc) => esc.type))
    .optional()
    .isIn(Object.values(ESComponentType)),
  body(nameOfESComponent((esc) => esc.name))
    .optional()
    .isString(),
  body(nameOfESComponent((esc) => esc.kenngroessen)).exists(),
  body(nameOfESComponent((esc) => esc.currentsPostIntervalMin))
    .optional()
    .isInt({ min: 1 }),
  body(nameOfESComponent((esc) => esc.maxHistoryDays))
    .optional()
    .isInt({ min: 1 }),
];

const arrayWildcard = "*.";
const esComponentCurrentCreateSet = [
  body().isArray({ min: 1 }),
  body(arrayWildcard + nameOfESComponentCurrent((cc) => cc.date))
    .exists()
    .isISO8601(),
  body(arrayWildcard + nameOfESComponentCurrent((cc) => cc.current)).exists(),
];
