import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from "./components/Navbaar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import SignIn from "./components/signInAndsignUp/signIn.js";
import SignUp from "./components/signInAndsignUp/signUp.js";
import ForgotPassword from "./components/signInAndsignUp/forgot_password.js";

function App() {
  return (
    <>
      <Navbaar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/view/:id" element={<Details />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
