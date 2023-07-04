import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.scss"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.min.css"

function App() {
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
            <ToastContainer autoClose={3000} />
        </main>
    )
}

export default App
