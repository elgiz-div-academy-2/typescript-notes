import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validationMiddleware = (
  schema: z.ZodSchema<any>,
  type: "body" | "query" | "params" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let { success, data, error } = schema.safeParse(req[type]);

    if (success) {
      req[type] = data;
      next();
    } else {
      res.status(400).json({ error: error?.issues });
    }
  };
};

export default validationMiddleware;
