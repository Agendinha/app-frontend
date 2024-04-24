import {Routes, Route} from "react-router-dom"
import Home from "../pages/Home/home"
import Login from "../pages/Login/login"

function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default MainRoutes