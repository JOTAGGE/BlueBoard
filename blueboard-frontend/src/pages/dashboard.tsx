import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  LinearProgress,
  Button,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../services/api";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  boardId: string;
}

interface Board {
  id: string;
  title: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const [tasksMap, setTasksMap] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    async function loadBoards() {
      try {
        const boardsRes = await api.get("/boards");
        const boardsData: Board[] = boardsRes.data;

        setBoards(boardsData);

        const tasksEntries = await Promise.all(
          boardsData.map(async (board) => {
            const tasksRes = await api.get(`/tasks/${board.id}`);
            return [board.id, tasksRes.data] as [string, Task[]];
          })
        );

        setTasksMap(Object.fromEntries(tasksEntries));
      } catch (error) {
        console.error(error);
      }
    }

    loadBoards();
  }, []);

  async function handleCreateBoard() {
    const response = await api.post("/boards", {
      title: "Nova Board"
    });

    const newBoard = response.data;

    setBoards(prev => [...prev, newBoard]);
    setTasksMap(prev => ({ ...prev, [newBoard.id]: [] }));
  }

  async function handleDeleteBoard(boardId: string) {
    const confirmDelete = confirm("Excluir esta board?");
    if (!confirmDelete) return;

    await api.delete(`/boards/${boardId}`);
    setBoards(prev => prev.filter(b => b.id !== boardId));
  }

  const progress = useMemo(() => {
    const allTasks = Object.values(tasksMap).flat();
    if (allTasks.length === 0) return 0;

    const completed = allTasks.filter(t => t.completed).length;
    return Math.round((completed / allTasks.length) * 100);
  }, [tasksMap]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", px: 6, py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Dashboard
      </Typography>

      <Box mb={4}>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Progresso geral
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr"
          },
          gap: 3
        }}
      >
        {boards.map(board => {
          const tasks = tasksMap[board.id] || [];
          const completed = tasks.filter(t => t.completed).length;

          const boardProgress =
            tasks.length === 0
              ? 0
              : Math.round((completed / tasks.length) * 100);

          return (
            <Card key={board.id} sx={{ borderRadius: 4 }}>
              <Box display="flex" justifyContent="space-between" px={2} pt={2}>
                <Typography variant="h6" fontWeight={600}>
                  {board.title}
                </Typography>

                <IconButton
                  onClick={() => handleDeleteBoard(board.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <CardActionArea onClick={() => navigate(`/boards/${board.id}`)}>
                <CardContent>
                  <LinearProgress
                    variant="determinate"
                    value={boardProgress}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>

      <Box mt={4}>
        <Button variant="contained" onClick={handleCreateBoard}>
          Criar Board
        </Button>
      </Box>

      {boards.length === 0 && (
        <Typography mt={6} textAlign="center" color="text.secondary">
          Nenhum board criado ainda.
        </Typography>
      )}
    </Box>
  );
}
