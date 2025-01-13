import { z } from "zod";
import noteValidation from "../validations/note.validation";

export type createNoteParams = z.infer<typeof noteValidation.create>;
