import express, { Router } from "express";
import * as UserController from "../controllers/UserController";
import { matchUserId } from "../middleware/matchUserId";
import { authenticateJWT } from "../middleware/authentification";
import {
  getUserValidationSetForRoute,
  UserRoutes,
} from "./express-validator_sets/getUserValidationSetForRoute";

export function setUserRoutes(mainRouter: Router): void {
  const userRouter = express.Router();
  userRouter
    .route("/login")
    .post(
      getUserValidationSetForRoute(UserRoutes.postLogin),
      UserController.postUserLogin
    );
  userRouter
    .route("/")
    .get(authenticateJWT, UserController.getCurrentUser)
    .post(
      getUserValidationSetForRoute(UserRoutes.post),
      UserController.postUser
    );

  userRouter
    .route("/:userId")
    .all(authenticateJWT)
    .all(matchUserId)
    .get(
      getUserValidationSetForRoute(UserRoutes.idGet),
      UserController.getUserId
    )
    .patch(
      getUserValidationSetForRoute(UserRoutes.idPatch),
      UserController.patchUserId
    )
    .delete(
      getUserValidationSetForRoute(UserRoutes.idDelete),
      UserController.deleteUserId
    );

  mainRouter.use("/users", userRouter);
}
