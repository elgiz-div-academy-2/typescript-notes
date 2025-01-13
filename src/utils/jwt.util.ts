import jwt from "jsonwebtoken";
import config from "../config";
const encodePayload = (payload: any): string => {
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" });
  return token;
};
const decodePayload = (token: string): any => {
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    return payload;
  } catch (error) {
    return false;
  }
};

export default {
  encodePayload,
  decodePayload,
};
