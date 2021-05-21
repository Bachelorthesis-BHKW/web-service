import express from "express";
import * as UserService from "../services/UserService";
import respondAsJson from "../helper/respondAsJson";
import { UserCreateAttributes } from "../models/User";

export async function postUsers(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const userIn: UserCreateAttributes = req.body;

  const newUser = await UserService.createNewUser(userIn);
  respondAsJson(newUser, res);
}

export async function getUsersId(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const userId = +req.params.userId;

  const user = await UserService.getUserById(userId);
  respondAsJson(user, res);
}

export async function patchUsersId(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const userId = +req.params.userId;
  const userIn: UserCreateAttributes = req.body;

  await UserService.patchUserById(userId, userIn);
  res.status(200).end();
}

export async function deleteUsersId(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const userId = +req.params.userId;

  await UserService.deleteUserById(userId);
  res.status(200).end();
}

export async function postUserLogin(
  req: express.Request,
  res: express.Response
): Promise<void> {
  const email = req.body.email;
  const password = req.body.password;

  const jwt = await UserService.getJWTForUser(email, password);
  respondAsJson(jwt, res);
}
