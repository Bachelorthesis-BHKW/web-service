import express from "express";
import ExpressError, { ErrorCode } from "../../error";
import { getUserByEmailAndPassword } from "../../services/UserService";
import BasicAuthParser from "basic-auth";
import { User } from "../../models/User";

export async function getUserForBasicAuth(req: express.Request): Promise<User> {
  const auth = BasicAuthParser(req);
  if (!auth) throw new ExpressError(ErrorCode.UNAUTHORIZED_401);
  return await getUserByEmailAndPassword(auth.name, auth.pass);
}
