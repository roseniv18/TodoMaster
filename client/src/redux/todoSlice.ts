import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Todo } from "../types/Todo"
import axios from "axios"
import { createTodoThunk } from "./todoThunks/createTodoThunk"
import { getTodosThunk } from "./todoThunks/getTodosThunk"
import { deleteTodoThunk } from "./todoThunks/deleteTodoThunk"

type TodoState = {
    todos: Todo[]
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    alert: {
        show: boolean
        type: string
        msg: string
    }
}

// CREATE TODO
export const createTodo = createAsyncThunk("todo/create", createTodoThunk)
// GET ALL TODOS
export const getTodos = createAsyncThunk("todo/getAll", getTodosThunk)
// DELETE TODO
export const deleteTodo = createAsyncThunk("todo/delete", deleteTodoThunk)

// UPDATE TODO
// export const updateTodo = createAsyncThunk("todo/update", async(_, thunkAPI))

const initialState: TodoState = {
    todos: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    alert: {
        show: false,
        type: "",
        msg: "",
    },
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        },
    },
    extraReducers: (builder) => {
        // CREATE TODO
        builder.addCase(createTodo.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(createTodo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos = [...state.todos, action.payload]
            state.alert = {
                show: true,
                type: "success",
                msg: `Created new goal!`,
            }
        })
        builder.addCase(createTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            if (typeof action.payload === "string") {
                state.alert = {
                    show: true,
                    type: "error",
                    msg: `Error: ${action.payload}`,
                }
            }
        })

        // GET ALL TODOS
        builder.addCase(getTodos.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos = action.payload
        })
        builder.addCase(getTodos.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            if (typeof action.payload === "string") {
                state.alert = {
                    show: true,
                    type: "error",
                    msg: `Error: ${action.payload}`,
                }
            }
        })

        // DELETE TODO
        builder.addCase(deleteTodo.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.todos = state.todos.filter((todo) => todo._id !== action.payload)
            state.alert = {
                show: true,
                type: "success",
                msg: `Deleted goal ${action.payload}`,
            }
        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            if (typeof action.payload === "string") {
                state.alert = {
                    show: true,
                    type: "error",
                    msg: `Error: ${action.payload}`,
                }
            }
        })
    },
})

export default todoSlice.reducer
export const { reset } = todoSlice.actions
