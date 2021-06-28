import { RequestHandler } from "express";

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
      set = [];
      break;
    case UserRoutes.postLogin:
      set = [];
      break;
    case UserRoutes.idGet:
      set = [];
      break;
    case UserRoutes.idPatch:
      set = [];
      break;
    case UserRoutes.idDelete:
      set = [];
      break;
    default:
      set = [];
  }
  return set;
}
