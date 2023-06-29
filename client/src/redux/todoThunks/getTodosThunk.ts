import axios from "axios"

export const getTodosThunk = async (thunkAPI: any) => {
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
}
