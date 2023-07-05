import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.scss"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.min.css"
import { useAppDispatch, useAppSelector } from "./redux/store"
import { setCustomAlert } from "./redux/userSlice"
import Footer from "./components/Footer"

function App() {
    const { alert } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Clear the alert object every 3 seconds
        const todoAlertTimeout = setTimeout(() => {
            dispatch(
                setCustomAlert({
                    show: false,
                    type: "",
                    msg: "",
                })
            )
        }, 3000)

        return () => {
            clearTimeout(todoAlertTimeout)
        }
    }, [alert])

    return (
        <main className="container">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Dashboard />} index />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
            <Footer />
            <ToastContainer autoClose={3000} />
        </main>
    )
}

export default App
