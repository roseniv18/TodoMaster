import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { createTodo, getTodos } from "../redux/todoSlice"
import TodoItem from "../components/TodoItem"
import { toast } from "react-toastify"
import { setCustomAlert } from "../redux/userSlice"
import Spinner from "../components/Spinner"

type NewTodo = {
    text: string
}

const Dashboard = () => {
    const [newTodo, setNewTodo] = useState<NewTodo>({
        text: "",
    })
    const { isLoading, isError, isSuccess, todos, alert } = useAppSelector(
        (store) => store.todos
    )
    const { user } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const { text } = newTodo

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewTodo((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!text) {
            dispatch(setCustomAlert("Text field cannot be empty!"))
            return
        }
        dispatch(createTodo(newTodo))
        setNewTodo({
            text: "",
        })
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
        if (isError) {
            console.log("err")
        }

        if (!user._id) {
            navigate("/login")
        }

        dispatch(getTodos())
    }, [user, isError])

    return (
        <section className="dashboard">
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <h3>Add new goal</h3>

                    <div className="form-group">
                        <input
                            type="text"
                            name="text"
                            id="text"
                            value={text}
                            placeholder="Add new goal..."
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn primary-btn"
                        disabled={isLoading}
                    >
                        Add
                    </button>
                </form>
            </section>

            <section className="todos">
                {isLoading ? (
                    <Spinner />
                ) : todos.length > 0 ? (
                    todos.map((todo) => {
                        return <TodoItem todo={todo} />
                    })
                ) : (
                    <h3>No todos found </h3>
                )}
            </section>
        </section>
    )
}

export default Dashboard
