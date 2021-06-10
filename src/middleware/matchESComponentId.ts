import express from "express";
import ExpressError, { ErrorCode } from "../error";
import { getEnergySystemById } from "../services/EnergySystemService";

export async function matchESComponentId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  const esComponentId = +req.params.esComponentId;
  if (energySystemId && esComponentId) {
    const energySystem = await getEnergySystemById(energySystemId);
    if (!(await energySystem.hasESComponent(esComponentId)))
      throw new ExpressError(ErrorCode.FORBIDDEN_403);
  }
  next();
}
