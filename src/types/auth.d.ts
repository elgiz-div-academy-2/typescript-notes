import { z } from "zod";
import authValidation from "../validations/auth.validation";
import { Request } from "express";
import { User } from "../database/entities/User.entity";

export type SignInParams = z.infer<typeof authValidation.signIn>;
export type SingUpParams = z.infer<typeof authValidation.singUp>;

export interface AuthorizedRequest extends Request {
  user?: User;
}
