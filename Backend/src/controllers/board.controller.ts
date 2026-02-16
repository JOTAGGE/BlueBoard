import { Request, Response } from "express";
import { createBoard, getBoards, updateBoard, deleteBoard } from "../services/board.service";
import { AuthRequest } from "../middlewares/auth.middleware";

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
  const { id } = req.params;
  const { title } = req.body;
  const userId = req.userId!;

  await updateBoard(id, title, userId);

  res.json({ message: "Board updated" });
}

export async function remove(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const userId = req.userId!;

  await deleteBoard(id, userId);

  res.json({ message: "Board deleted" });
}
