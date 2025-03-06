import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom"
import { Dashboard } from "./Pages/Dashboard";
import { Signin } from "./Pages/signin";
import { Send } from "./Pages/send";
import { Signup } from "./Pages/signup";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin"/>} />
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/send" element={<Send/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App