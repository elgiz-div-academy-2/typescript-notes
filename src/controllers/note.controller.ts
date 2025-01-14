import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../types/auth";
import noteService from "../services/note.service";
import { DeleteNoteParams } from "../types/note";

const getUserNotes = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await noteService.getUserNotes(req.user?.id!);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
const getAllUserNotes = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await noteService.getAllUserNotes();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await noteService.create(req.user?.id!, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const update = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await noteService.update(
      req.user?.id!,
      +req.params.id,
      req.body
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = await noteService.deleteNote(req.user?.id!, +req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const noteController = {
  getUserNotes,
  getAllUserNotes,
  create,
  update,
  deleteNote,
};

export default noteController;
