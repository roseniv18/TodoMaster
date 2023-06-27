const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT
const todoRoutes = require("./routes/todoRoutes")
const colors = require("colors")
const errorHandler = require("./middleware/errorHandler")
const connectDB = require("./config/connectDB")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(errorHandler)

app.use("/api/todos", todoRoutes)

connectDB()

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
