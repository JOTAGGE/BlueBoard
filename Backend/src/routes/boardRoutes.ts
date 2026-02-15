import { Router, Request, Response } from "express";
import BoardController from "../controllers/BoardController";

const router = Router();

router.post("/", BoardController.create);

router.post("/", (req: Request, res: Response) => {
  res.json({ message: "Board created" });
});

export default router;
