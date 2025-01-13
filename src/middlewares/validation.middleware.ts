import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validationMiddleware = (schema: z.ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let { success, data, error } = schema.safeParse(req.body);

    if (success) {
      req.body = data;
      next();
    } else {
      res.status(400).json({ error: error?.issues });
    }
  };
};

export default validationMiddleware;
