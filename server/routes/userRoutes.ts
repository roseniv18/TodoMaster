import express from "express"
const router = express.Router()
import protect from "../middleware/authHandler"
import { registerUser, loginUser, getMe } from "../controllers/userController"

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getMe)

export default router
