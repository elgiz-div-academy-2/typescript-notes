import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../types/auth";
import noteService from "../services/note.service";

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

const noteController = {
  getUserNotes,
  create,
};

export default noteController;
