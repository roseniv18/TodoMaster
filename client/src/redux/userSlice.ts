import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../types/User"
import axios, { AxiosError } from "axios"

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
    isSuccess: boolean
    isError: boolean
    alert: {
        show: boolean
        type: string
        msg: string
    }
}

export const registerUser = createAsyncThunk(
    "user/register",
    async (userData: { username: string; email: string; password: string }, thunkAPI) => {
        try {
            const res = await axios.post(
                `http://localhost:5005/api/users/register`,
                userData
            )

            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data))
            }

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

export const loginUser = createAsyncThunk(
    "user/login",
    async (userData: { email: string; password: string }, thunkAPI) => {
        try {
            const res = await axios.post(
                `http://localhost:5005/api/users/login`,
                userData
            )

            if (res.data) {
                localStorage.setItem("user", JSON.stringify(res.data))
            }

            return res.data
        } catch (error) {
            let message: string = ""
            if (typeof error === "string") {
                message = error
                return thunkAPI.rejectWithValue(message)
            } else if (error instanceof AxiosError) {
                message = error.response?.data.message
                return thunkAPI.rejectWithValue(message)
            } else if (error instanceof Error) {
                message = error.message
                return thunkAPI.rejectWithValue(message)
            }
        }
    }
)

export const logoutUser = createAsyncThunk("user/logout", async () => {
    localStorage.removeItem("user")
})

const initialState: UserState = {
    user: user,
    isLoading: false,
    isSuccess: false,
    isError: false,
    alert: {
        show: false,
        type: "",
        msg: "",
    },
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.alert = {
                show: false,
                type: "",
                msg: "",
            }
        },

        setCustomAlert: (state, action) => {
            const { type, msg } = action.payload
            state.alert = {
                show: true,
                type,
                msg,
            }
        },
    },
    extraReducers: (builder) => {
        // Register User
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.alert = {
                show: false,
                type: "",
                msg: "",
            }
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.alert = {
                show: true,
                type: "success",
                msg: `Welcome ${action.payload.username}`,
            }
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            if (typeof action.payload === "string") {
                state.alert = {
                    show: true,
                    type: "error",
                    msg: action.payload,
                }
            }
        })

        // Login User
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.alert = {
                show: false,
                type: "",
                msg: "",
            }
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.alert = {
                show: true,
                type: "success",
                msg: `Welcome back ${action.payload.username}`,
            }
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            if (typeof action.payload === "string") {
                state.alert = {
                    show: true,
                    type: "error",
                    msg: action.payload,
                }
            }
        })

        // Logout User
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true
            state.alert = {
                show: false,
                type: "",
                msg: "",
            }
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = {
                _id: "",
                name: "",
                email: "",
                token: "",
            }
            state.alert = {
                show: true,
                type: "success",
                msg: `Logged out`,
            }
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.alert = {
                show: true,
                type: "error",
                msg: `Error loggin out. Try again later.`,
            }
        })
    },
})

export default userSlice.reducer
export const { reset, setCustomAlert } = userSlice.actions
