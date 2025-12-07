import { Router } from "express";
import * as columnController from "../controllers/columnController";

const router = Router();

router.get("/", columnController.listColumns);
router.post("/", columnController.createColumn);
router.put("/:id", columnController.renameColumn);
router.delete("/:id", columnController.deleteColumn);

export default router;
