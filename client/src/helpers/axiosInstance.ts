import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://todo-master.onrender.com/api",
})

export default axiosInstance
