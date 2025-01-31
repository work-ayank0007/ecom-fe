import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Admin from "./pages/Admin"

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </>
  )
}

export default App
