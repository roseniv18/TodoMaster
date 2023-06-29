import { useState, ChangeEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { registerUser, reset } from "../redux/userSlice"

type FormDataType = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const Register = () => {
    const [formData, setFormData] = useState<FormDataType>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const { user, isSuccess, isLoading, isError } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { username, email, password, confirmPassword } = formData

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill out all fields!")
            return
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!")
            return
        }

        const userData = {
            username,
            email,
            password,
        }

        dispatch(registerUser(userData))

        e.preventDefault()
    }

    useEffect(() => {
        if (isSuccess || user._id) {
            navigate("/")
        }

        return () => {
            dispatch(reset())
        }
    }, [isSuccess, user])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username..."
                    value={username}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email..."
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password..."
                    value={password}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password..."
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register
