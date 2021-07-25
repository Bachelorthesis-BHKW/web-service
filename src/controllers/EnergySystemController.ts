import express from "express";
import * as EnergySystemService from "../services/EnergySystemService";
import * as ESConsumptionService from "../services/ESConsumptionService";
import * as ESScheduleService from "../services/ESScheduleService";
import respondAsJson from "../helpers/respondAsJson";
import { EnergySystemCreateAttributes } from "../models/EnergySystem";
import { ESConsumptionCreateAttributes } from "../models/ESConsumption";
import ExpressError, { ErrorCode } from "../error";

export async function postEnergySystem(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemIN: EnergySystemCreateAttributes = req.body;
  const user = req.user;

  const newEnergySystem = await EnergySystemService.createEnergySystem(
    energySystemIN,
    user.userId
  );
  respondAsJson(newEnergySystem, res);
}

export async function getEnergySystem(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystem = req.energySystem;
  respondAsJson(energySystem, res);
}

export async function getEnergySystems(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const user = req.user;

  const energySystems = await EnergySystemService.getEnergySystemsForUser(user);
  respondAsJson(energySystems, res);
}

export async function patchEnergySystem(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  const energySystemIN: EnergySystemCreateAttributes = req.body;

  await EnergySystemService.patchEnergySystemById(
    energySystemId,
    energySystemIN
  );
  res.status(200).end();
}

export async function deleteEnergySystem(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;

  await EnergySystemService.deleteEnergySystemById(energySystemId);
  res.status(200).end();
}

export async function getEnergySystemConsumption(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystem = req.energySystem;

  const consumptions = await ESConsumptionService.getAllConsumptionsForES(
    energySystem
  );
  respondAsJson(consumptions, res);
}

export async function postEnergySystemConsumption(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  const consumptionIN: ESConsumptionCreateAttributes[] = req.body;

  await ESConsumptionService.addConsumptionsToES(consumptionIN, energySystemId);
  res.status(200).end();
}

export async function getEnergySystemSchedule(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  const componentIdQuery = req.query.componentId;
  if (!componentIdQuery) throw new ExpressError(ErrorCode.BAD_REQUEST_400);
  const componentId = +componentIdQuery;

  const schedule = await ESScheduleService.getESScheduleByEnergySystemId(
    energySystemId,
    componentId
  );
  respondAsJson(schedule, res);
}

export async function postEnergySystemSchedule(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystem = req.energySystem;

  ESScheduleService.runControlAlgorithm(energySystem);
  res.status(200).end();
}

export async function getEnergySystemScheduleNow(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;

  const now = await ESScheduleService.getESScheduleNowByEnergySystemId(
    energySystemId
  );
  respondAsJson(now, res);
}
