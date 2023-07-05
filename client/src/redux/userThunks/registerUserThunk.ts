import axiosInstance from "../../helpers/axiosInstance"

export const registerUserThunk = async (
    userData: { username: string; email: string; password: string },
    thunkAPI: any
) => {
    try {
        const res = await axiosInstance.post(`/users/register`, userData)
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
