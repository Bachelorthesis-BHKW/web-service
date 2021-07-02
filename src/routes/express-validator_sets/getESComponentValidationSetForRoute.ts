import { RequestHandler } from "express";
import { validate } from "../../middleware/validate";
import { body, param } from "express-validator";
import { nameOfESComponent } from "../../models/ESComponent";
import { ESComponentType } from "../../es_components/ESComponentType";
import { energySystemIdSet } from "./getEnergySystemValidationSetForRoute";
import { nameOfESComponentCurrent } from "../../models/ESComponentCurrent";
import { makeAllOptional } from "../../helpers/makeAllOptional";

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
    .isInt(),
  body(nameOfESComponent((esc) => esc.maxHistoryDays))
    .exists()
    .isInt(),
];

const esComponentPatchSet = makeAllOptional(esComponentCreateSet);

const esComponentCurrentCreateSet = [
  body(nameOfESComponentCurrent((cc) => cc.date))
    .exists()
    .isISO8601(),
  body(nameOfESComponentCurrent((cc) => cc.current)).exists(),
];
