import { Router } from "express";
import { createTodo, updateTodo, markAsCompleted, deleteTodo, getAllTodos, getTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getAllTodos);
router.get("/:id", getTodo)
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.patch("/:id", markAsCompleted);
router.delete("/:id", deleteTodo);

export default router;