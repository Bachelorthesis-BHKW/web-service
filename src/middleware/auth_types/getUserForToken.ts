import express from "express";
import ExpressError, { ErrorCode } from "../../error";
import JWTHelper from "../../helpers/JWTHelper";
import { getUserById } from "../../services/UserService";
import { User } from "../../models/User";

export async function getUserForToken(req: express.Request): Promise<User> {
  const authorization = req.get("authorization");
  if (!authorization) throw new ExpressError(ErrorCode.UNAUTHORIZED_401);
  const token = getTokenFromBearer(authorization);
  let userId: number;
  let user: User;
  try {
    userId = JWTHelper.getInstance().verifyJWT(token);
    user = await getUserById(userId);
  } catch (e) {
    throw new ExpressError(ErrorCode.UNAUTHORIZED_401);
  }
  return user;
}

function getTokenFromBearer(bearer: string): string {
  return bearer.substr("bearer ".length, bearer.length);
}
