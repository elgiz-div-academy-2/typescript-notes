import { z } from "zod";

const signIn = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
});
const singUp = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
  age: z.number().optional(),
});

const authValidation = {
  signIn,
  singUp,
};

export default authValidation;
