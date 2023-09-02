import express from "express"
require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT
import todoRoutes from "./routes/todoRoutes"
import userRoutes from "./routes/userRoutes"
import errorHandler from "./middleware/errorHandler"
import connectDB from "./config/connectDB"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/todos", todoRoutes)
app.use("/api/users", userRoutes)
app.use(errorHandler)

connectDB()

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
