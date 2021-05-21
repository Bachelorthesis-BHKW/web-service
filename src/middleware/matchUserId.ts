import express from "express";
import ExpressError, { ErrorCode } from "../error";

export async function matchUserId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const userId = +req.params.userId;
  if (userId && req.user) {
    if (userId != req.user.userId)
      throw new ExpressError(ErrorCode.FORBIDDEN_403);
  }
  next();
}
