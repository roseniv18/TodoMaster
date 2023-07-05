const path = require("path")
const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT
const todoRoutes = require("./routes/todoRoutes")
const userRoutes = require("./routes/userRoutes")
const colors = require("colors")
const errorHandler = require("./middleware/errorHandler")
const connectDB = require("./config/connectDB")

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
