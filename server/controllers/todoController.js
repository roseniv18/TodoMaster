const asyncHandler = require("express-async-handler")
const Todo = require("../models/todoModel")

// @desc Get goals
// @route GET /api/goals
// @access PRIVATE
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find({})
    if (todos.length == 0) {
        res.status(200).json({ message: "No todos found" })
    }
    res.status(200).json(todos)
})

// @desc Create goal
// @route POST /api/goals
// @access PRIVATE
const setTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field!")
    }

    const todo = await Todo.create({
        text: req.body.text,
    })

    res.status(200).json(todo)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access PRIVATE
const updateTodo = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw new Error("No id!")
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedTodo)
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access PRIVATE
const deleteTodo = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        res.status(400)
        throw new Error("No id!")
    }

    await Todo.findByIdAndDelete(req.params.id)
    res.status(200).send(req.params.id)
})

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo,
}
