import { Router } from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"
import { createProject, deleteProject, getUserProject, updateProject } from "../controllers/project.controller.js"

const router = Router()

router.route("/").post(authMiddleware, createProject)
router.route("/").get(authMiddleware, getUserProject)
router.route("/:id").put(authMiddleware, updateProject)
router.route("/:id").delete(authMiddleware, deleteProject)

export default router