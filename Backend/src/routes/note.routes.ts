import { Router } from "express";
import * as controller from "../controllers/note.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyToken);

router.post("/", controller.create);
router.get("/:boardId", controller.list);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;