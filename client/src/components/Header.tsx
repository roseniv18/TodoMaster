import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { logoutUser } from "../redux/userSlice"
import { BiLogOut } from "react-icons/bi"

const Header = () => {
    const { user } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()

    return (
        <nav className="header">
            <Link to="/" className="nav-link">
                <h2>ToDoMaster</h2>
            </Link>
            {user._id ? (
                <button onClick={() => dispatch(logoutUser())} className="logout-btn">
                    Logout
                    <BiLogOut size={24} />
                </button>
            ) : (
                <></>
            )}
        </nav>
    )
}

export default Header
