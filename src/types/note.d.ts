import { z } from "zod";
import noteValidation from "../validations/note.validation";
import { AuthorizedRequest } from "./auth";

export type CreateNoteParams = z.infer<typeof noteValidation.create>;

export type UpdateNoteParams = z.infer<typeof noteValidation.create>;

export interface DeleteNoteParams {
  id: number;
}
