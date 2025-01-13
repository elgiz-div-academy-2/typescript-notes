import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result = await authService.signIn(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result = await authService.signUp(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const authController = {
  signIn,
  signUp,
};

export default authController;
