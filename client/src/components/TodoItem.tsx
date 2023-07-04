import { useAppDispatch } from "../redux/store"
import { deleteTodo, setEditingTodo, toggleModal } from "../redux/todoSlice"
import { Todo } from "../types/Todo"
import { FaEdit } from "react-icons/fa"
import { FiTrash2 } from "react-icons/fi"

const TodoItem = ({ todo }: { todo: Todo }) => {
    const dispatch = useAppDispatch()
    const createdAt = new Date(todo.createdAt).toLocaleDateString("en-GB")

    const onEdit = (id: string) => {
        dispatch(setEditingTodo(id))
        dispatch(toggleModal())
    }

    return (
        <article key={todo._id} className="todo">
            <p className="todoText">{todo.text}</p>
            <div className="todoActions">
                <button onClick={() => onEdit(todo._id)} className="btn secondary-btn">
                    <FaEdit size={16} />
                </button>
                <button
                    onClick={() => dispatch(deleteTodo(todo._id))}
                    className="btn close-btn"
                >
                    <FiTrash2 size={16} />
                </button>
            </div>
            <span className="createdAt">Created at {createdAt}</span>
        </article>
    )
}

export default TodoItem
