import express from "express";
import cors from "cors";
import boardRoutes from "./routes/board.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "BlueBoard API is running" });
});

app.use("/boards", boardRoutes);
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);

export default app;
