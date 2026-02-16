import { prisma } from "../database";

export async function createTask(title: string, boardId: string) {
  return prisma.task.create({
    data: { title, boardId }
  });
}

export async function getTasks(boardId: string) {
  return prisma.task.findMany({
    where: { boardId },
    orderBy: { createdAt: "desc" }
  });
}

export async function updateTask(id: string, title: string, completed: boolean) {
  return prisma.task.update({
    where: { id },
    data: { title, completed }
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({
    where: { id }
  });
}
