import mongoose from "mongoose"

const MONGO_URI: string = process.env.MONGO_URI as string

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB
