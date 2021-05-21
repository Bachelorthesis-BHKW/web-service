import express, { Router } from "express";
import * as UserController from "../controllers/UserController";
import { authenticateToken } from "../middleware/authenticateToken";

export function setUserRoutes(mainRouter: Router): void {
  const userRouter = express.Router();
  userRouter.use(authenticateToken);
  userRouter
    .route("/:userId")
    .get(UserController.getUserId)
    .patch(UserController.patchUserId)
    .delete(UserController.deleteUserId);

  const loginRouter = express.Router();
  loginRouter.route("/login").post(UserController.postUserLogin);
  loginRouter.route("/").post(UserController.postUser);

  mainRouter.use("/users", loginRouter, userRouter);
}
