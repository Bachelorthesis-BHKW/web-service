import express from "express";
import * as EnergySystemService from "../services/EnergySystemService";
import * as ESConsumptionService from "../services/ESConsumptionService";
import * as ESScheduleService from "../services/ESScheduleService";
import * as ESComponentService from "../services/ESComponentService";
import respondAsJson from "../helper/respondAsJson";
import { EnergySystemCreateAttributes } from "../models/EnergySystem";
import { ESConsumptionCreateAttributes } from "../models/ESConsumption";
import { ESComponentCreateAttributes } from "../models/ESComponent";

export async function postEnergySystem(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemIN: EnergySystemCreateAttributes = req.body;

  const newEnergySystem = await EnergySystemService.createEnergySystem(
    energySystemIN
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
  const consumptionIN: ESConsumptionCreateAttributes = req.body;

  await ESConsumptionService.addConsumptionToES(consumptionIN, energySystemId);
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

export async function postEnergySystemComponent(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;
  const esComponentIN: ESComponentCreateAttributes = req.body;

  const component = await ESComponentService.addComponentToES(
    energySystemId,
    esComponentIN
  );
  respondAsJson(component, res);
}

export async function getEnergySystemComponent(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const esComponentId = +req.params.esComponentId;

  const esComponent = await ESComponentService.getComponentById(esComponentId);
  respondAsJson(esComponent, res);
}

export async function patchEnergySystemComponent(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const esComponentId = +req.params.esComponentId;
  const esComponentIN: ESComponentCreateAttributes = req.body;

  await ESComponentService.patchComponent(esComponentId, esComponentIN);
  res.status(200).end();
}

export async function deleteEnergySystemComponent(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const esComponentId = +req.params.esComponentId;

  await ESComponentService.deleteComponent(esComponentId);
  res.status(200).end();
}
