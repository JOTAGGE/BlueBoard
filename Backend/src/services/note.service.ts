    import { prisma } from "../database";

export async function createNote(content: string, boardId: string) {
  return prisma.note.create({
    data: {
      content,
      boardId
    }
  });
}

export async function getNotes(boardId: string) {
  return prisma.note.findMany({
    where: { boardId },
    orderBy: { createdAt: "desc" }
  });
}

export async function updateNote(id: string, content: string) {
  return prisma.note.update({
    where: { id },
    data: { content }
  });
}

export async function deleteNote(id: string) {
  return prisma.note.delete({
    where: { id }
  });
}