import express, { Router } from "express";
import * as UserController from "../controllers/UserController";

export function setUserRoutes(mainRouter: Router): void {
  const userRouter = express.Router();
  userRouter
    .route("/:userId")
    .get(UserController.getUsersId)
    .patch(UserController.patchUsersId)
    .delete(UserController.deleteUsersId);
  userRouter.route("/").post(UserController.postUsers);
  userRouter.route("/login").post();
  mainRouter.use("/users", userRouter);
}
