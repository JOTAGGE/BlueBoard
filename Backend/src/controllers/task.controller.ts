import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createTask, getTasks, updateTask, deleteTask } from "../services/task.service";

export async function create(req: AuthRequest, res: Response) {
    console.log(req.body);

    const { title, boardId } = req.body;

    const task = await createTask(title, boardId);

  res.status(201).json(task);
}

export async function list(req: AuthRequest, res: Response) {
  const boardId = req.params.boardId as string;

  const tasks = await getTasks(boardId);

  res.json(tasks);
}

export async function update(req: AuthRequest, res: Response) {
  const id = req.params.id as string;
  const { title, completed } = req.body;

  const task = await updateTask(id, title, completed);

  res.json(task);
}

export async function remove(req: AuthRequest, res: Response) {
  const id = req.params.id as string;

  await deleteTask(id);

  res.json({ message: "Task deleted" });
}
