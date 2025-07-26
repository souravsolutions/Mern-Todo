import { Router } from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js"

const router = Router()

router.route("/").post(authMiddleware, createTodo)
router.route("/project/:projectId").get(authMiddleware, getTodos)
router.route("/:id").put(authMiddleware, updateTodo)
router.route("/:id").delete(authMiddleware, deleteTodo)

export default router