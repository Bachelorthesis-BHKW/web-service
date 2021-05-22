import express from "express";
import ExpressError, { ErrorCode } from "../error";
import * as EnergySystemService from "../services/EnergySystemService";

export async function matchESComponentId(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  const esComponentId = +req.params.esComponentId;
  if (energySystemId && esComponentId) {
    const energySystem = await EnergySystemService.getEnergySystemById(
      energySystemId
    );
    if (!(await energySystem.hasESComponent(esComponentId)))
      throw new ExpressError(ErrorCode.FORBIDDEN_403);
  }
  next();
}
