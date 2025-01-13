import dataSource from "../database";
import { Note } from "../database/entities/Note.entity";
import { createNoteParams } from "../types/note";

const getUserNotes = async (userId: number) => {
  let noteRepo = dataSource.getRepository(Note);

  return await noteRepo.find({
    where: { user: { id: userId } },
    select: {
      id: true,
      content: true,
      user: {
        id: true,
        username: true,
      },
    },
    relations: ["user"],
    order: {
      createdAt: "DESC",
    },
  });
};

const create = async (userId: number, params: createNoteParams) => {
  let noteRepo = dataSource.getRepository(Note);

  let note = noteRepo.create({
    user: {
      id: userId,
    },
    ...params,
  });

  await noteRepo.save(note);

  return note;
};

const noteService = {
  getUserNotes,
  create,
};

export default noteService;
