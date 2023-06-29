import { useAppDispatch } from "../redux/store"
import { deleteTodo } from "../redux/todoSlice"
import { Todo } from "../types/Todo"
import { AiOutlineClose } from "react-icons/ai"

const TodoItem = ({ todo }: { todo: Todo }) => {
    const dispatch = useAppDispatch()
    const createdAt = new Date(todo.createdAt).toLocaleDateString("en-GB")

    return (
        <article key={todo._id} className="todo">
            <span className="createdAt">Created at {createdAt}</span>
            <p>{todo.text}</p>
            <button onClick={() => dispatch(deleteTodo(todo._id))}>
                <AiOutlineClose size={18} />
            </button>
        </article>
    )
}

export default TodoItem
