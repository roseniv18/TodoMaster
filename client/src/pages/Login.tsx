import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { loginUser, reset, setCustomAlert } from "../redux/userSlice"
import { toast } from "react-toastify"

type FormDataType = {
    email: string
    password: string
}

const Login = () => {
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: "",
    })
    const [emptyFields, setEmptyFields] = useState<string[]>([""])
    const { isSuccess, isError, isLoading, user, alert } = useAppSelector(
        (store) => store.user
    )
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { email, password } = formData

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEmptyFields((prev) => prev.filter((p) => p !== name))
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) {
            setEmptyFields((prev) => [...prev, "email"])
        }

        if (!password) {
            setEmptyFields((prev) => [...prev, "password"])
        }

        if (!email || !password) {
            dispatch(
                setCustomAlert({ type: "error", msg: "Please fill out all fields!" })
            )
            return
        }

        const userData = {
            email,
            password,
        }

        dispatch(loginUser(userData))
        setEmptyFields([""])
    }

    useEffect(() => {
        if (alert.show && alert.msg) {
            if (alert.type === "error") {
                toast.error(alert.msg)
            } else if (alert.type === "success") {
                toast.success(alert.msg)
            }
        }
    }, [alert])

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
        <section className="form">
            <h2>Login to your account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email..."
                        value={email}
                        className={emptyFields.includes("email") ? "errorField" : ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password..."
                        value={password}
                        className={emptyFields.includes("password") ? "errorField" : ""}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-btn">
                    login
                </button>
                <button className="secondary-btn">
                    <Link to="/register">Create an account</Link>
                </button>
            </form>
        </section>
    )
}

export default Login
