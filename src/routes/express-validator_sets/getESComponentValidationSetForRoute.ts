import { RequestHandler } from "express";

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
      set = [];
      break;
    case ESComponentRoutes.get:
      set = [];
      break;
    case ESComponentRoutes.idGet:
      set = [];
      break;
    case ESComponentRoutes.idPatch:
      set = [];
      break;
    case ESComponentRoutes.idDelete:
      set = [];
      break;
    case ESComponentRoutes.idCurrentsPost:
      set = [];
      break;
    default:
      set = [];
  }
  return set;
}
