import { Request, Response } from "express"
import Todo from "../models/todoModel"
import asyncHandler from "express-async-handler"
import { CreateTodo } from "../types/CreateTodo"
import { UpdateTodo } from "../types/UpdateTodo"

// @desc Get goals
// @route GET /api/goals
// @access PRIVATE
const getTodos = asyncHandler(async (req: Request, res: Response) => {
    const todos = await Todo.find({
        user: req.user.id,
    })
    if (todos.length == 0) {
        res.status(200).json({ message: "No todos found" })
    }
    res.status(200).json(todos)
})

// @desc Create goal
// @route POST /api/goals
// @access PRIVATE
const setTodo = asyncHandler(async (req: Request<{}, {}, CreateTodo>, res: Response) => {
    const { text } = req.body

    if (!text) {
        res.status(400)
        throw new Error("Please add a text field!")
    }

    const todo = await Todo.create({
        text,
        user: req.user.id,
    })

    res.status(200).json(todo)
})

// @desc Update goal
// @route PUT /api/goals/:id
// @access PRIVATE
const updateTodo = asyncHandler(
    // UpdateTodo is the type for the req.params ({id: string})
    // CreateTodo is the type for the new todo from req.body ({text: string, ...})
    async (req: Request<UpdateTodo, {}, CreateTodo>, res: Response) => {
        const { id } = req.params

        if (!id) {
            res.status(400)
            throw new Error("No id!")
        }

        const todo = await Todo.findById(id)

        if (!todo) {
            res.status(400)
            throw new Error("Todo not found.")
        }

        if (!req.user) {
            res.status(401)
            throw new Error("User not found.")
        }

        if (todo.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error("Not authorized!")
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
            new: true,
        })

        res.status(200).json(updatedTodo)
    }
)

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access PRIVATE
const deleteTodo = asyncHandler(async (req: Request<UpdateTodo>, res: Response) => {
    const { id } = req.params

    if (!id) {
        res.status(400)
        throw new Error("No id!")
    }

    const todo = await Todo.findById(id)

    if (!todo) {
        res.status(400)
        throw new Error("Todo not found.")
    }

    if (!req.user) {
        res.status(401)
        throw new Error("User not found.")
    }

    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not authorized!")
    }

    await Todo.findByIdAndDelete(id)
    res.status(200).send(id)
})

export { getTodos, setTodo, updateTodo, deleteTodo }
