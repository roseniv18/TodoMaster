import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import User from "../models/userModel"
import { Request, Response } from "express"
import { RegisterUser } from "../types/RegisterUser"
import { LoginUser } from "../types/LoginUser"

// @desc Register new user
// @route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(
    async (req: Request<{}, {}, RegisterUser>, res: Response) => {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400)
            throw new Error("Please fill out all fields!")
        }

        // Check if user already exists
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400)
            throw new Error("User with this email already exists.")
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(JSON.stringify(user._id)),
            })
        } else {
            res.status(400)
            throw new Error("Invalid user data.")
        }
    }
)

// @desc Authenticate user
// @route POST /api/users/login
// @access PUBLIC
const loginUser = asyncHandler(async (req: Request<{}, {}, LoginUser>, res: Response) => {
    const { email, password } = req.body

    // Check if user exists
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password as string))) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(JSON.stringify(user._id)),
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc Get user data
// @route GET /api/users/me
// @access PRIVATE
const getMe = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "15d" })
}

export { registerUser, loginUser, getMe }
