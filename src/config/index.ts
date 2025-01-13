import dotenv from "dotenv";
import * as path from "path";

const envPath = path.join(__dirname, "../../.env");

dotenv.config({ path: envPath });

export default {
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || "supersecret",
};
