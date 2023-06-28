import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Todo } from "../types/Todo"

type TodoState = {
    todos: Todo[]
    isLoading: boolean
    alert: {
        show: boolean
        type: string
        msg: string
    }
}

const initialState: TodoState = {
    todos: [],
    isLoading: false,
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
})

export default todoSlice.reducer
export const {} = todoSlice.actions
