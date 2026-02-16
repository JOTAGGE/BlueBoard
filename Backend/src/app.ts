import express from "express";
import cors from "cors";
import boardRoutes from "./routes/board.routes";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import noteRoutes from "./routes/note.routes";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});


app.get("/", (req, res) => {
  res.json({ message: "BlueBoard API is running" });
});

app.use("/notes", noteRoutes);
app.use("/tasks", taskRoutes);
app.use("/boards", boardRoutes);
app.use("/auth", authRoutes);

export default app;
