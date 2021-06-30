import express from "express";
import { ESComponentCurrentCreateAttributes } from "../models/ESComponentCurrent";
import * as ESComponentCurrentService from "../services/ESComponentCurrentService";
import { ESComponentCreateAttributes } from "../models/ESComponent";
import * as ESComponentService from "../services/ESComponentService";
import respondAsJson from "../helpers/respondAsJson";

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

export async function getEnergySystemComponents(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const energySystemId = +req.params.energySystemId;

  const esComponents = await ESComponentService.getComponentsByEnergySystemId(
    energySystemId
  );
  respondAsJson(esComponents, res);
}

export async function getEnergySystemComponentId(
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

export async function postEnergySystemComponentCurrent(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const esComponentId = +req.params.esComponentId;
  const esComponentCurrentIN: ESComponentCurrentCreateAttributes = req.body;

  await ESComponentCurrentService.addESComponentCurrentToESComponent(
    esComponentId,
    esComponentCurrentIN
  );
  res.status(200).end();
}
