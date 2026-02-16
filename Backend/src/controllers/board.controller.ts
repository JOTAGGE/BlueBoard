import { Request, Response } from "express";
import { createBoard, getBoards, updateBoard, deleteBoard,getBoardWithProgress } from "../services/board.service";

import { AuthRequest } from "../middlewares/auth.middleware";

export async function getProgress(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const userId = req.userId!;

  const board = await getBoardWithProgress(id, userId);

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  res.json(board);
}


export async function create(req: AuthRequest, res: Response) {
  const { title } = req.body;
  const userId = req.userId!;

  const board = await createBoard(title, userId);

  res.status(201).json(board);
}

export async function list(req: AuthRequest, res: Response) {
  const userId = req.userId!;

  const boards = await getBoards(userId);

  res.json(boards);
}

export async function update(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const { title } = req.body;
  const userId = req.userId!;

  await updateBoard(id, title, userId);

  res.json({ message: "Board updated" });
}

export async function remove(req: AuthRequest, res: Response) {
  const id = String(req.params.id);
  const userId = req.userId!;

  await deleteBoard(id, userId);

  res.json({ message: "Board deleted" });
}
