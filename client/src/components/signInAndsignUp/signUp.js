import React, { useEffect, useState, useContext } from "react";
import {
  MainContainer,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  LoginWith,
  Button,
  Input,
  PasswordContainer,
  EyeIcon,
} from "./signin_signup";
import { NavLink, useNavigate } from "react-router-dom";
import { authdata } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function SignUp() {
  const { loggedIn, setLoggedIn, userId, setUserId } = useContext(authdata);

  const [signUpData, setsignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // console.log(signUpData);

  const addSignUpdata = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    // console.log({name:value});
    setsignUpData(() => {
      return {
        ...signUpData,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const SendSignUpData = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpData;

    const res = await fetch("/signupregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      toast.warn("Resistered failed", { position: "top-center" });
      // console.log("No register data");
    } else {
      toast.success(" Resistered successfully", { position: "top-center" });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/");
    }
  }, [loggedIn]);

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form method="POST">
      <MainContainer>
        <WelcomeText>Sign Up</WelcomeText>
        <InputContainer>
          <Input
            type="name"
            placeholder="Enter name"
            name="name"
            onChange={addSignUpdata}
            value={signUpData.name}
          />
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={addSignUpdata}
            value={signUpData.email}
          />
          {/* <Input type="password" placeholder="Enter Password" /> */}
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              name="password"
              onChange={addSignUpdata}
              value={signUpData.password}
            />
            <EyeIcon onClick={handlePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </EyeIcon>
          </PasswordContainer>
        </InputContainer>
        <ButtonContainer>
          <Button onClick={SendSignUpData}>SignUp</Button>
          <LoginWith>
            Already have a account?
            <NavLink to="/login">
              <span> LogIn</span>
            </NavLink>
          </LoginWith>
        </ButtonContainer>
      </MainContainer>
      <ToastContainer />
    </form>
  );
}

export default SignUp;
