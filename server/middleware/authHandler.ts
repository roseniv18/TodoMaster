import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel"
import { Response } from "express"

const protect = asyncHandler(async (req: any, res: Response, next) => {
    let token = ""
    const headerAuth = req.headers.authorization
    if (headerAuth && headerAuth.startsWith("Bearer")) {
        try {
            // Get token from header
            token = headerAuth.split(" ")[1]
            // Verify token
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
            // Get user from token
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Not authorized!")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not authorized - no token!")
    }
})

export default protect
