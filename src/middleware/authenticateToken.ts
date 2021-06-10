import express from "express";
import ExpressError, { ErrorCode } from "../error";
import JWTHelper from "../helpers/JWTHelper";
import { getUserById } from "../services/UserService";

export async function authenticateToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const authorization = req.get("authorization");
  if (!authorization) throw new ExpressError(ErrorCode.UNAUTHORIZED_401);
  const token = getTokenFromBearer(authorization);
  let userId: number;
  try {
    userId = JWTHelper.getInstance().verifyJWT(token);
    req.user = await getUserById(userId);
  } catch (e) {
    throw new ExpressError(ErrorCode.UNAUTHORIZED_401);
  }
  next();
}

function getTokenFromBearer(bearer: string): string {
  return bearer.substr("bearer ".length, bearer.length);
}
