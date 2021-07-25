import express from "express";
import ExpressError, { ErrorCode } from "../error";
import { getEnergySystemById } from "../services/EnergySystemService";

export async function matchEnergySystemId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  if (energySystemId && req.user) {
    if (!(await req.user.hasEnergySystem(energySystemId)))
      throw new ExpressError(ErrorCode.FORBIDDEN_403);
    req.energySystem = await getEnergySystemById(energySystemId);
  }
  next();
}
