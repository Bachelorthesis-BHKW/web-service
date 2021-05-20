import express from "express";
import * as EnergySystemService from "../services/EnergySystemService";
import respondAsJson from "../helper/respondAsJson";
import { EnergySystemCreateAttributes } from "../models/EnergySystem";

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
