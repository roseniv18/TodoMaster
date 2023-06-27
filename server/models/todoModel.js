const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
    {
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: "User",
        // },
        text: {
            type: String,
            required: [true, "Please enter a text value!"],
        },
    },
    {
        timestamps: true,
    }
)

const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo
