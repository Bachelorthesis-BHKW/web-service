import { RequestHandler } from "express";
import { body, param } from "express-validator";
import { validate } from "../../middleware/validate";
import { nameOfUser } from "../../models/User";
import { makeAllOptional } from "../../helpers/makeAllOptional";

export enum UserRoutes {
  post,
  postLogin,
  idGet,
  idPatch,
  idDelete,
}

export function getUserValidationSetForRoute(
  route: UserRoutes
): RequestHandler[] {
  let set: RequestHandler[];
  switch (route) {
    case UserRoutes.post:
      set = [...userCreateSet];
      break;
    case UserRoutes.postLogin:
      set = [...userLoginSet];
      break;
    case UserRoutes.idGet:
      set = [...userIdSet];
      break;
    case UserRoutes.idPatch:
      set = [...userIdSet, ...userPatchSet];
      break;
    case UserRoutes.idDelete:
      set = [...userIdSet];
      break;
    default:
      set = [];
  }
  set.push(validate);
  return set;
}

const userIdSet = [param("userId").exists().isInt()];

const userLoginSet = [
  body(nameOfUser((u) => u.email))
    .exists()
    .isEmail(),
  body(nameOfUser((u) => u.password))
    .exists()
    .isString(),
];

const userCreateSet = [
  ...userLoginSet,
  body(nameOfUser((u) => u.name))
    .exists()
    .isString(),
  body(nameOfUser((u) => u.name))
    .optional()
    .isString(),
];

const userPatchSet = makeAllOptional(userCreateSet);
