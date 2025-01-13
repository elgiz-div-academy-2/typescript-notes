import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import noteValidation from "../validations/note.validation";
import noteController from "../controllers/note.controller";

const noteRouter = Router();

noteRouter.get("/", noteController.getUserNotes);

noteRouter.post(
  "/",
  validationMiddleware(noteValidation.create),
  noteController.create
);

export default noteRouter;
