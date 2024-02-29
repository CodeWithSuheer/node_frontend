import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import './App.css'
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setAuthenticated, userDetailsAsync } from "./features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasksAsync } from "./features/taskSlice";

function App() {
  const dispatch = useDispatch();
  // const Loginser = useSelector((state) => state.auth.loginUser);

  useEffect(() => {
    dispatch(userDetailsAsync())
      .then((res) => {
        dispatch(setAuthenticated(res.payload?.user))
      })
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
