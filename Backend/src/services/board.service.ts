import { prisma } from "../database";

export async function createBoard(title: string, userId: string) {
  return prisma.board.create({
    data: {
      title,
      userId,
    },
  });
}

export async function getBoards(userId: string) {
  return prisma.board.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateBoard(id: string, title: string, userId: string) {
  return prisma.board.updateMany({
    where: { id, userId },
    data: { title },
  });
}

export async function deleteBoard(id: string, userId: string) {
  return prisma.board.deleteMany({
    where: { id, userId },
  });
}
