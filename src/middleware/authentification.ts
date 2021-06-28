import express from "express";
import { getUserForToken } from "./auth_types/getUserForToken";
import { getUserForBasicAuth } from "./auth_types/getUserForBasicAuth";
import ExpressError, { ErrorCode } from "../error";
import { logIfDev } from "../helpers/logIfDev";

export async function authenticate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  let success = false;
  try {
    await authenticateBasic(req, res, next);
    success = true;
  } catch (e) {
    logIfDev("Basic auth failed!");
  }
  try {
    await authenticateJWT(req, res, next);
    success = true;
  } catch (e) {
    logIfDev("JWT auth failed!");
  }
  if (!success) throw new ExpressError(ErrorCode.UNAUTHORIZED_401);
}

export async function authenticateJWT(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  req.user = await getUserForToken(req);
  next();
}

export async function authenticateBasic(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  req.user = await getUserForBasicAuth(req);
  next();
}
