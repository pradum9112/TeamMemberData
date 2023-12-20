import React, { useState, useContext, useEffect } from "react";
import {
  MainContainer,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  LoginWith,
  ForgotPassword,
  Button,
  Input,
  PasswordContainer,
  EyeIcon,
} from "./signin_signup";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { authdata } from "../context/ContextProvider";
import "react-toastify/dist/ReactToastify.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignIn() {
  const { loggedIn, setLoggedIn, userId, setUserId } = useContext(authdata);
  const [loginUserdata, setLoginUserdata] = useState({
    email: "",
    password: "",
  });
  console.log(loginUserdata);

  const addLoginUserdata = (e) => {
    const { name, value } = e.target;
    setLoginUserdata(() => {
      return {
        ...loginUserdata,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();
  const sendLogInData = async (e) => {
    e.preventDefault();
    const { email, password } = loginUserdata;

    const res = await fetch("/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.status == 422 || !data) {
      toast.warn("logedIn failed", { position: "top-center" });
    } else {
      toast.success("logedIn successfully", { position: "top-center" });
      setLoginUserdata({ ...loginUserdata, email: "", password: "" });
      localStorage.setItem("userId", data._id);
      setUserId(data._id);
      setLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [loggedIn]);

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form method="POST">
      <MainContainer>
        <WelcomeText>LogIn</WelcomeText>
        <InputContainer>
          <Input
            type="text"
            name="email"
            placeholder="Enter email"
            onChange={addLoginUserdata}
            value={loginUserdata.email}
          />
          {/* <Input type="password" placeholder="Enter Password" /> */}
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              onChange={addLoginUserdata}
              value={loginUserdata.password}
            />
            <EyeIcon onClick={handlePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </EyeIcon>
          </PasswordContainer>
          <ForgotPassword>
            <NavLink to="/forgotpassword">
              <span>Forgot Password ?</span>
            </NavLink>
          </ForgotPassword>
        </InputContainer>
        <ButtonContainer>
          <Button onClick={sendLogInData}>LogIn</Button>
          <LoginWith>
            Don't have a account?
            <NavLink to="/signup">
              <span> Resister</span>
            </NavLink>
          </LoginWith>
        </ButtonContainer>
      </MainContainer>
      <ToastContainer />
    </form>
  );
}

export default SignIn;
