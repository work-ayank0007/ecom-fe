import Navbar from "./components/Navbar"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Admin from "./pages/Admin"
import Cart from "./pages/Cart"

function App() {
  return (
    <>
      <Navbar/>
      <div className=" w-full h-16"></div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </>
  )
}

export default App
