import axiosInstance from "../../helpers/axiosInstance"

export const updateTodoThunk = async (
    { id, data }: { id: string; data: { text: string } },
    thunkAPI: any
) => {
    try {
        // @ts-ignore
        const token: string = thunkAPI.getState().user.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const res = await axiosInstance.put(`/todos/${id}`, data, config)

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
