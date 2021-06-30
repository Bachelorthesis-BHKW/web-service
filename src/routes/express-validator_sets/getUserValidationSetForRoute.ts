import { RequestHandler } from "express";
import { body, param } from "express-validator";
import { validate } from "../../middleware/validate";

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
      set = [...userIdSet, ...userCreateSet];
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
  body("email").exists().isEmail(),
  body("password").exists().isString(),
];

const userCreateSet = [
  ...userLoginSet,
  body("name").exists().isString(),
  body("company").optional().isString(),
];
