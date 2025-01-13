import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import authValidation from "../validations/auth.validation";
import authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post(
  "/login",
  validationMiddleware(authValidation.signIn),
  authController.signIn
);

authRouter.post(
  "/register",
  validationMiddleware(authValidation.singUp),
  authController.signUp
);

export default authRouter;
