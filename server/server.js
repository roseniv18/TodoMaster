const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT
const colors = require("colors")
const connectDB = require("./config/connectDB")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
