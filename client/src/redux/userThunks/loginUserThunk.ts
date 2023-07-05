import { AxiosError } from "axios"
import axiosInstance from "../../helpers/axiosInstance"

export const loginUserThunk = async (
    userData: { email: string; password: string },
    thunkAPI: any
) => {
    try {
        const res = await axiosInstance.post(`/users/login`, userData)

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
