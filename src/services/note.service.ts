import dataSource from "../database";
import { Note } from "../database/entities/Note.entity";
import { User } from "../database/entities/User.entity";
import { CreateNoteParams, UpdateNoteParams } from "../types/note";
import { NotFoundError } from "../utils/error.util";

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

const getAllUserNotes = async () => {
  let userRepo = dataSource.getRepository(User);

  let result = await userRepo.find({
    relations: ["notes"],
  });

  return result;
};

const create = async (userId: number, params: CreateNoteParams) => {
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

const update = async (
  userId: number,
  noteId: number,
  params: UpdateNoteParams
) => {
  let noteRepo = dataSource.getRepository(Note);

  let note = await noteRepo.findOne({
    where: {
      id: noteId,
      user: {
        id: userId,
      },
    },
  });

  if (!note) throw new NotFoundError("Note is not found");

  await noteRepo.update({ id: noteId }, params);
  return {
    message: "Note is updated successfully",
  };
};

const deleteNote = async (userId: number, noteId: number) => {
  let noteRepo = dataSource.getRepository(Note);

  let result = await noteRepo.delete({ id: noteId, user: { id: userId } });

  if (result.affected) return { message: "Note is deleted successfully" };

  throw new NotFoundError("Note is not found");
};

const noteService = {
  getUserNotes,
  getAllUserNotes,
  create,
  update,
  deleteNote,
};

export default noteService;
