import { z } from "zod";

const create = z.object({
  content: z.string().min(3),
});

const deleteNote = z.object({
  id: z.coerce.number().min(1),
});

const noteValidation = {
  create,
  deleteNote,
};

export default noteValidation;
