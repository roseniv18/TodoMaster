import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Todo } from "../types/Todo"
import axios from "axios"

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
export const createTodo = createAsyncThunk(
    "todo/create",
    async (data: { text: string }, thunkAPI) => {
        try {
            // @ts-ignore
            const token: string = thunkAPI.getState().user.user.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const res = await axios.post(`http://localhost:5005/api/todos`, data, config)

            return res.data
        } catch (error) {
            let message: string = ""
            if (typeof error === "string") {
                message = error
            } else if (error instanceof Error) {
                message = error.message
            }
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// GET ALL TODOS
export const getTodos = createAsyncThunk("todo/getAll", async (_, thunkAPI) => {
    try {
        // @ts-ignore
        const token: string = thunkAPI.getState().user.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const res = await axios.get(`http://localhost:5005/api/todos`, config)
        return res.data
    } catch (error) {
        let message: string = ""
        if (typeof error === "string") {
            message = error
        } else if (error instanceof Error) {
            message = error.message
        }
        return thunkAPI.rejectWithValue(message)
    }
})

// DELETE TODO
export const deleteTodo = createAsyncThunk(
    "todo/delete",
    async (id: string, thunkAPI) => {
        try {
            // @ts-ignore
            const token: string = thunkAPI.getState().user.user.token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            const res = await axios.delete(
                `http://localhost:5005/api/todos/${id}`,
                config
            )
            return res.data
        } catch (error) {
            let message: string = ""
            if (typeof error === "string") {
                message = error
            } else if (error instanceof Error) {
                message = error.message
            }
            return thunkAPI.rejectWithValue(message)
        }
    }
)

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
    reducers: {},
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
export const {} = todoSlice.actions
