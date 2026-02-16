import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createNote, getNotes, updateNote, deleteNote } from "../services/note.service";

export async function create(req: AuthRequest, res: Response) {
  const { content, boardId } = req.body;

  const note = await createNote(content, boardId);

  res.status(201).json(note);
}

export async function list(req: AuthRequest, res: Response) {
  const boardId = req.params.boardId as string;

  const notes = await getNotes(boardId);

  res.json(notes);
}

export async function update(req: AuthRequest, res: Response) {
  const id = req.params.id as string;
  const { content } = req.body;

  const note = await updateNote(id, content);

  res.json(note);
}

export async function remove(req: AuthRequest, res: Response) {
  const id = req.params.id as string;

  await deleteNote(id);

  res.json({ message: "Note deleted" });
}