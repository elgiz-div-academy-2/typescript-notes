import { Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import noteValidation from "../validations/note.validation";
import noteController from "../controllers/note.controller";

const noteRouter = Router();

noteRouter.get("/", noteController.getUserNotes);
noteRouter.get("/all", noteController.getAllUserNotes);
noteRouter.post(
  "/:id",
  validationMiddleware(noteValidation.create),
  noteController.update
);
noteRouter.delete(
  "/:id",
  validationMiddleware(noteValidation.deleteNote, "params"),
  noteController.deleteNote
);

noteRouter.post(
  "/",
  validationMiddleware(noteValidation.create),
  noteController.create
);

export default noteRouter;
