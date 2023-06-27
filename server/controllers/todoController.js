const asyncHandler = require("express-async-handler")
const Todo = require("../models/todoModel")

const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({})
    if (todos.length == 0) {
        res.status(200).json({ msg: "No todos found" })
    }
    res.status(200).json(todos)
})

module.exports = {
    getTodos,
}
