import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";



function App() {
  return (
    <>
    <Router>

      <Header/>

      <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/Profile" element={<Profile/>}> </Route>
      <Route path="/SignIn" element={<SignIn/>}> </Route>
      <Route path="/SignUp" element={<SignUp/>}> </Route>
      <Route path="/ForgotPassword" element={<ForgotPassword/>}> </Route>
      <Route path="/Offers" element={<Offers/>}> </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
