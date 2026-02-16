import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  IconButton,
  LinearProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  boardId: string;
}

interface Note {
  id: string;
  content: string;
  boardId: string;
}

interface Board {
  id: string;
  title: string;
}

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [boardTitle, setBoardTitle] = useState("");
  const [editingBoard, setEditingBoard] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  const [newTask, setNewTask] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        const boardsRes = await api.get("/boards");
        const board = boardsRes.data.find((b: Board) => b.id === id);

        if (board) setBoardTitle(board.title);

        const tasksRes = await api.get(`/tasks/${id}`);
        setTasks(tasksRes.data);

        const notesRes = await api.get(`/notes/${id}`);
        setNotes(notesRes.data);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, [id]);

  const { completed, total, progress } = useMemo(() => {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const progress = total === 0 ? 0 : (completed / total) * 100;
    return { completed, total, progress };
  }, [tasks]);

  async function handleCreateTask() {
    if (!newTask.trim() || !id) return;

    const response = await api.post("/tasks", {
      title: newTask,
      boardId: id
    });

    setTasks(prev => [...prev, response.data]);
    setNewTask("");
  }

  async function handleCreateNote() {
    if (!newNote.trim() || !id) return;

    const response = await api.post("/notes", {
      content: newNote,
      boardId: id
    });

    setNotes(prev => [...prev, response.data]);
    setNewNote("");
  }

  async function toggleTask(task: Task) {
    const response = await api.put(`/tasks/${task.id}`, {
      completed: !task.completed
    });

    setTasks(prev =>
      prev.map(t => (t.id === task.id ? response.data : t))
    );
  }

  async function deleteTask(taskId: string) {
    await api.delete(`/tasks/${taskId}`);
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }

  async function deleteNote(noteId: string) {
    await api.delete(`/notes/${noteId}`);
    setNotes(prev => prev.filter(n => n.id !== noteId));
  }

  async function updateBoardTitle() {
    if (!boardTitle.trim() || !id) return;

    await api.put(`/boards/${id}`, { title: boardTitle });
    setEditingBoard(false);
  }

  return (
    <Box sx={{ p: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Voltar
      </Button>

      {editingBoard ? (
        <TextField
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
          onBlur={updateBoardTitle}
          onKeyDown={(e) => e.key === "Enter" && updateBoardTitle()}
          fullWidth
          variant="standard"
        />
      ) : (
        <Typography
          variant="h4"
          fontWeight={600}
          onClick={() => setEditingBoard(true)}
          sx={{ cursor: "pointer" }}
        >
          {boardTitle}
        </Typography>
      )}

      <Box sx={{ mt: 2, mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 8, borderRadius: 5 }}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {completed} de {total} tarefas concluídas
        </Typography>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Tarefas" />
        <Tab label="Notas" />
      </Tabs>

      {tab === 0 && (
        <>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Nova tarefa"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreateTask}>
              Criar
            </Button>
          </Box>

          <List>
            {tasks.map(task => (
              <ListItem
                key={task.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={async () => {
                        const newTitle = prompt("Editar tarefa:", task.title);
                        if (!newTitle) return;

                        const response = await api.put(`/tasks/${task.id}`, {
                          title: newTitle
                        });

                        setTasks(prev =>
                          prev.map(t => (t.id === task.id ? response.data : t))
                        );
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => deleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                />
                {task.title}
              </ListItem>
            ))}
          </List>
        </>
      )}

      {tab === 1 && (
        <>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Nova nota"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <Button variant="contained" onClick={handleCreateNote}>
              Criar
            </Button>
          </Box>

          <List>
            {notes.map(note => (
              <ListItem
                key={note.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={async () => {
                        const newContent = prompt("Editar nota:", note.content);
                        if (!newContent) return;

                        const response = await api.put(`/notes/${note.id}`, {
                          content: newContent
                        });

                        setNotes(prev =>
                          prev.map(n => (n.id === note.id ? response.data : n))
                        );
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => deleteNote(note.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                {note.content}
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}
