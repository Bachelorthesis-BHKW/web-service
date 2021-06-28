import express from "express";
import * as EnergySystemService from "../services/EnergySystemService";
import * as ESConsumptionService from "../services/ESConsumptionService";
import * as ESScheduleService from "../services/ESScheduleService";
import * as WeatherForecastService from "../services/WeatherForecastService";
import respondAsJson from "../helpers/respondAsJson";
import { EnergySystemCreateAttributes } from "../models/EnergySystem";
import { ESConsumptionCreateAttributes } from "../models/ESConsumption";
import ControlAlgorithmHelper from "../helpers/ControlAlgorithmHelper";

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
  const energySystemId = +req.params.energySystemId;

  const energySystem = await EnergySystemService.getEnergySystemById(
    energySystemId
  );
  respondAsJson(energySystem, res);
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

export async function postEnergySystemConsumption(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  const consumptionIN:
    | ESConsumptionCreateAttributes
    | ESConsumptionCreateAttributes[] = req.body;

  if (Array.isArray(consumptionIN))
    await ESConsumptionService.addConsumptionsToES(
      consumptionIN,
      energySystemId
    );
  else
    await ESConsumptionService.addConsumptionToES(
      consumptionIN,
      energySystemId
    );
  res.status(200).end();
}

export async function getEnergySystemSchedule(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;

  const schedule = await ESScheduleService.getESScheduleByEnergySystemId(
    energySystemId
  );
  respondAsJson(schedule, res);
}

export async function postEnergySystemSchedule(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  const energySystem = await EnergySystemService.getEnergySystemById(
    energySystemId
  );

  await WeatherForecastService.fetchHourlyWeatherForEnergySystem(energySystem);
  ControlAlgorithmHelper.runWithEnergySystem(energySystem);
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
