import express from "express";
import ExpressError, { ErrorCode } from "../error";
import { validationResult } from "express-validator";

export function validate(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    throw new ExpressError(
      ErrorCode.BAD_REQUEST_400,
      JSON.stringify(validationErrors.array())
    );
  next();
}
