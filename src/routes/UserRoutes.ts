import express, { Router } from "express";
import * as UserController from "../controllers/UserController";
import { authenticateToken } from "../middleware/authenticateToken";
import { matchUserId } from "../middleware/matchUserId";

export function setUserRoutes(mainRouter: Router): void {
  const userRouter = express.Router();
  userRouter.route("/login").post(UserController.postUserLogin);
  userRouter.route("/").post(UserController.postUser);

  userRouter
    .route("/:userId")
    .all(authenticateToken)
    .all(matchUserId)
    .get(UserController.getUserId)
    .patch(UserController.patchUserId)
    .delete(UserController.deleteUserId);

  mainRouter.use("/users", userRouter);
}
