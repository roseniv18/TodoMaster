const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const protect = asyncHandler(async (req, res, next) => {
    let token = ""
    const headerAuth = req.headers.authorization
    if (headerAuth && headerAuth.startsWith("Bearer")) {
        try {
            // Get token from header
            token = headerAuth.split(" ")[1]
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
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

module.exports = protect
