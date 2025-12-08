import { Router } from "express";
import * as issueController from "../controllers/issueController";

const router = Router();

router.get("/", issueController.listIssues);
router.post("/", issueController.createIssue);
router.put("/:id", issueController.renameIssue);
router.delete("/:id", issueController.deleteIssue);

export default router;
