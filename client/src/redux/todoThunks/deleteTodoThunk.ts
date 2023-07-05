import axios from "axios"
import axiosInstance from "../../helpers/axiosInstance"

export const deleteTodoThunk = async (id: string, thunkAPI: any) => {
    try {
        // @ts-ignore
        const token: string = thunkAPI.getState().user.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const res = await axiosInstance.delete(`/todos/${id}`, config)
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
