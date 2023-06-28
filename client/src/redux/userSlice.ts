import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../types/User"

// Get user from local storage
let user = {
    _id: "",
    name: "",
    email: "",
    token: "",
}

if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user") || "{}")
}

type UserState = {
    user: User
    isLoading: boolean
    alert: {
        show: boolean
        type: string
        msg: string
    }
}

const initialState: UserState = {
    user: user,
    isLoading: false,
    alert: {
        show: false,
        type: "",
        msg: "",
    },
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
})

export default userSlice.reducer
export const {} = userSlice.actions
