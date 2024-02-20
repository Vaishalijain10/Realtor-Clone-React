import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <Router>

        <Header />

        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/Profile" element={<Profile />}> </Route>
          <Route path="/SignIn" element={<SignIn />}> </Route>
          <Route path="/SignUp" element={<SignUp />}> </Route>
          <Route path="/ForgotPassword" element={<ForgotPassword />}> </Route>
          <Route path="/Offers" element={<Offers />}> </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    
        />
    </>
  );
}

export default App;
