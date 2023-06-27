const express = require("express")
const router = express.Router()
const { getTodos, setTodo } = require("../controllers/todoController")

router.route("/").get(getTodos).post(setTodo)

module.exports = router
