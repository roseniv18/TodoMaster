import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { logoutUser, reset } from "../redux/userSlice"
import { createTodo, deleteTodo, getTodos } from "../redux/todoSlice"

type NewTodo = {
    text: string
}

const Dashboard = () => {
    const [newTodo, setNewTodo] = useState<NewTodo>({
        text: "",
    })
    const { isLoading, isError, isSuccess, todos } = useAppSelector(
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
            alert("Text field cannot be empty!")
            return
        }
        dispatch(createTodo(newTodo))
    }

    useEffect(() => {
        if (isError) {
            console.log("err")
        }

        if (!user._id) {
            navigate("/login")
        }

        dispatch(getTodos())

        return () => {
            dispatch(reset())
        }
    }, [user, isError])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h1>dashboard</h1>
            <button onClick={() => dispatch(logoutUser())}>logout</button>
            <h2>Add new goal</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="text"
                    id="text"
                    value={text}
                    placeholder="Add new goal..."
                    onChange={handleChange}
                />
                <button type="submit">add</button>
            </form>
            <div className="todos">
                {todos.length > 0 ? (
                    todos.map((todo) => {
                        return (
                            <article key={todo._id}>
                                <p>{todo.text}</p>
                                <button onClick={() => dispatch(deleteTodo(todo._id))}>
                                    X
                                </button>
                            </article>
                        )
                    })
                ) : (
                    <h2>No todos found </h2>
                )}
            </div>
        </div>
    )
}

export default Dashboard
