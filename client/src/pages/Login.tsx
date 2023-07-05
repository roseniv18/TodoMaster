import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { loginUser, reset, setCustomAlert } from "../redux/userSlice"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import FormRow from "../components/FormRow"
import { inputValidator } from "../helpers/inputValidator"

type FormDataType = {
    email: string
    password: string
}

const Login = () => {
    const [formData, setFormData] = useState<FormDataType>({
        email: "",
        password: "",
    })
    const [errorFields, setErrorFields] = useState<string[]>([""])
    const { isSuccess, isLoading, user, alert } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { email, password } = formData

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

        const userData = {
            email,
            password,
        }

        dispatch(loginUser(userData))
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
            <h3>Login to your account</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <FormRow
                        type="email"
                        name="email"
                        placeholder="Email..."
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

                <div className="form-actions">
                    <button type="submit" className="btn primary-btn">
                        login
                    </button>
                    <Link to="/register" className="btn tertiary-btn">
                        Create an account
                    </Link>
                </div>
            </form>
        </section>
    )
}

export default Login
