import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { loginUser, reset } from "../redux/userSlice"

type FormDataType = {
    email: string
    password: string
}

const Login = () => {
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: "",
    })
    const { isSuccess, isError, isLoading, user } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { email, password } = formData

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
        e.preventDefault()
        if (!email || !password) {
            alert("Please fill out all fields!")
            return
        }

        const userData = {
            email,
            password,
        }

        dispatch(loginUser(userData))
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
                    name="email"
                    id="email"
                    placeholder="email..."
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password..."
                    value={password}
                    onChange={handleChange}
                />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login
