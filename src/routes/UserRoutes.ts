import express, { Router } from "express";

export function setUserRoutes(mainRouter: Router): void {
  const userRouter = express.Router();

  mainRouter.use("/users", userRouter);
}
