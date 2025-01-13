import "reflect-metadata";
import "./database/index";
import express, { Express, Request, Response } from "express";
import router from "./routes";
import config from "./config";
import { errorMiddleware } from "./middlewares/error.middleware";

const app: Express = express();

app.use(express.json());

app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.json({ hello: "world" });
});

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log("application is running");
});
