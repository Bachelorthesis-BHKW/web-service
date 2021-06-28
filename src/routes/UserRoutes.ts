import express, { Router } from "express";
import * as UserController from "../controllers/UserController";
import { matchUserId } from "../middleware/matchUserId";
import { authenticateJWT } from "../middleware/authentification";

export function setUserRoutes(mainRouter: Router): void {
  const userRouter = express.Router();
  userRouter.route("/login").post(UserController.postUserLogin);
  userRouter.route("/").post(UserController.postUser);

  userRouter
    .route("/:userId")
    .all(authenticateJWT)
    .all(matchUserId)
    .get(UserController.getUserId)
    .patch(UserController.patchUserId)
    .delete(UserController.deleteUserId);

  mainRouter.use("/users", userRouter);
}
