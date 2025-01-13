import dataSource from "../database";
import { User } from "../database/entities/User.entity";
import { SignInParams, SingUpParams } from "../types/auth";
import * as bcrypt from "bcrypt";
import jwtUtil from "../utils/jwt.util";
import { UnauthorizedError } from "../utils/error.util";

const signIn = async (params: SignInParams) => {
  let userRepo = dataSource.getRepository(User);

  let user = await userRepo.findOne({ where: { username: params.username } });

  if (!user) throw new UnauthorizedError("User or password is wrong");

  const checkPassword = await bcrypt.compare(params.password, user.password);

  if (!checkPassword) throw new UnauthorizedError("User or password is wrong");

  let token = jwtUtil.encodePayload({ userId: user.id });

  return {
    user: {
      ...user,
      password: undefined,
    },
    token,
  };
};

const signUp = async (params: SingUpParams) => {
  let userRepo = dataSource.getRepository(User);
  let user = userRepo.create(params);

  await userRepo.save(user);

  return user;
};

const authService = {
  signIn,
  signUp,
};

export default authService;
