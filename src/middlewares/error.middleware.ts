import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error.util";

export async function errorMiddleware(
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
