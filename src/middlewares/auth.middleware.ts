import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/error.util";
import jwtUtil from "../utils/jwt.util";
import dataSource from "../database";
import { User } from "../database/entities/User.entity";
import { AuthorizedRequest } from "../types/auth";

export async function authMiddleware(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  const userRepo = dataSource.getRepository(User);

  let token = req.headers.authorization || "";
  token = token.split(" ")[1];

  if (!token) return next(new UnauthorizedError());

  let payload = jwtUtil.decodePayload(token);

  if (!payload?.userId) return next(new UnauthorizedError());

  let user = await userRepo.findOne({ where: { id: payload.userId } });

  if (!user) return next(new UnauthorizedError());

  req.user = user;

  next();
}
