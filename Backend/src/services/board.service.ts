import { prisma } from "../database";

export async function getBoardWithProgress(boardId: string, userId: string) {
  const board = await prisma.board.findFirst({
    where: { id: boardId, userId },
    include: { tasks: true }
  });

  if (!board) return null;

  const total = board.tasks.length;
  const done = board.tasks.filter(task => task.completed).length;

  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return {
    ...board,
    progress
  };
  
}

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

