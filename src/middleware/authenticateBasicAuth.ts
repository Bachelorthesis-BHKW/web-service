import express from "express";
import ExpressError, { ErrorCode } from "../error";
import { getUserByEmailAndPassword } from "../services/UserService";
import BasicAuthParser from "basic-auth";

export async function authenticateBasicAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const auth = BasicAuthParser(req);
  if (!auth) throw new ExpressError(ErrorCode.UNAUTHORIZED_401);
  req.user = await getUserByEmailAndPassword(auth.name, auth.pass);
  next();
}
