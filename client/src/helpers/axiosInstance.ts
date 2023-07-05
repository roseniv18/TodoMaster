import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://todo-master.onrender.com/api",
})

export default axiosInstance
