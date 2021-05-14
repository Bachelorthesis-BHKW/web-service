import express from "express";
import * as UserService from "../services/UserService";

export async function postUsers(
  req: express.Request,
  res: express.Response
): Promise<void> {
  await UserService.createNewUser(req.body);
  res.status(200).end();
}
