import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useNavigate } from "react-router-dom"
import { logoutUser, reset } from "../redux/userSlice"

const Dashboard = () => {
    const { user } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user._id) {
            navigate("/login")
        }

        return () => {
            dispatch(reset())
        }
    }, [user])

    return (
        <div>
            <h1>dashboard</h1>
            <button onClick={() => dispatch(logoutUser())}>logout</button>
        </div>
    )
}

export default Dashboard
