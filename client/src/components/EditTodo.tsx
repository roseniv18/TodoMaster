import { useState, ChangeEvent } from "react"
import { Todo } from "../types/Todo"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { setCustomAlert } from "../redux/userSlice"
import { toggleModal, updateTodo } from "../redux/todoSlice"
import { AiOutlineClose } from "react-icons/ai"

const EditTodo = () => {
    const { editingTodo } = useAppSelector((store) => store.todos)
    const [editedTodo, setEditedTodo] = useState<Todo>(editingTodo)
    const dispatch = useAppDispatch()
    const { text } = editedTodo

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedTodo((prev) => {
            return {
                ...prev,
                text: e.target.value,
            }
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!editedTodo.text) {
            dispatch(
                setCustomAlert({
                    type: "error",
                    msg: "Text field cannot be empty!",
                })
            )
            return
        }
    }

    return (
        <div className="overlay">
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <h2>Edit goal</h2>

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
                        className="submit-btn"
                        onClick={() =>
                            dispatch(
                                updateTodo({
                                    id: editedTodo._id,
                                    data: {
                                        text: editedTodo.text,
                                    },
                                })
                            )
                        }
                    >
                        Edit
                    </button>
                    <button onClick={() => dispatch(toggleModal())}>
                        <AiOutlineClose size={18} />
                    </button>
                </form>
            </section>
        </div>
    )
}

export default EditTodo
