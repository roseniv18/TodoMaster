import express from "express"
const router = express.Router()
import { getTodos, setTodo, updateTodo, deleteTodo } from "../controllers/todoController"
import protect from "../middleware/authHandler"

router.route("/").get(protect, getTodos).post(protect, setTodo)
router.route("/:id").put(protect, updateTodo).delete(protect, deleteTodo)

export default router
