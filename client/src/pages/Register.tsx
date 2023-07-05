import { useState, ChangeEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { registerUser, reset, setCustomAlert } from "../redux/userSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import FormRow from "../components/FormRow"
import { inputValidator } from "../helpers/inputValidator"

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
    const [errorFields, setErrorFields] = useState<string[]>([""])
    const { user, isSuccess, isLoading, alert } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { username, email, password, confirmPassword } = formData

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setErrorFields((prev) => prev.filter((p) => p !== name))
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fieldsArr = inputValidator(formData)
        if (fieldsArr.length > 0 && fieldsArr[0].trim() !== "") {
            setErrorFields(inputValidator(formData))
            dispatch(
                setCustomAlert({ type: "error", msg: "Please fill out all fields!" })
            )
            return
        }

        if (password !== confirmPassword) {
            setErrorFields(["password", "confirmPassword"])
            dispatch(setCustomAlert({ type: "error", msg: "Passwords do not match!" }))
            return
        }

        const userData = {
            username,
            email,
            password,
        }

        dispatch(registerUser(userData))

        setErrorFields([""])
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
        return <Spinner />
    }

    return (
        <section className="form">
            <h3>Create an account</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <FormRow
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        handleChange={handleChange}
                        errorFields={errorFields}
                    />
                </div>
                <div className="form-group">
                    <FormRow
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        handleChange={handleChange}
                        errorFields={errorFields}
                    />
                </div>
                <div className="form-group">
                    <FormRow
                        type="password"
                        name="password"
                        placeholder="Password..."
                        value={password}
                        handleChange={handleChange}
                        errorFields={errorFields}
                    />
                </div>
                <div className="form-group">
                    <FormRow
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password..."
                        value={confirmPassword}
                        handleChange={handleChange}
                        errorFields={errorFields}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn primary-btn">
                        Register
                    </button>
                    <Link to="/login" className="btn tertiary-btn">
                        Login
                    </Link>
                </div>
            </form>
        </section>
    )
}

export default Register
