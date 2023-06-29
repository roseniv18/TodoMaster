import { useAppDispatch, useAppSelector } from "../redux/store"
import { deleteTodo, setEditingTodo, toggleModal, updateTodo } from "../redux/todoSlice"
import { Todo } from "../types/Todo"
import { AiOutlineClose } from "react-icons/ai"
import { FaEdit } from "react-icons/fa"
import EditTodo from "./EditTodo"

const TodoItem = ({ todo }: { todo: Todo }) => {
    const { showModal } = useAppSelector((store) => store.todos)
    const dispatch = useAppDispatch()
    const createdAt = new Date(todo.createdAt).toLocaleDateString("en-GB")

    const onEdit = (id: string) => {
        dispatch(setEditingTodo(id))
        dispatch(toggleModal())
    }

    return (
        <article key={todo._id} className="todo">
            <span className="createdAt">Created at {createdAt}</span>
            <p>{todo.text}</p>
            <button onClick={() => dispatch(deleteTodo(todo._id))}>
                <AiOutlineClose size={18} />
            </button>
            <button onClick={() => onEdit(todo._id)}>
                <FaEdit />
            </button>
            {showModal ? <EditTodo /> : <></>}
        </article>
    )
}

export default TodoItem
