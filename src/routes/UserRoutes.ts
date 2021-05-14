import express, { Router } from "express";
import * as UserController from "../controllers/UserController";

export function setUserRoutes(mainRouter: Router): void {
  const userRouter = express.Router();
  userRouter.route("/").post(UserController.postUsers).get().patch().delete();
  userRouter.route("/login").post();
  mainRouter.use("/users", userRouter);
}
