import React, { useState } from "react";
import {
  MainContainer,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  Button,
  Input,
  PasswordContainer,
  EyeIcon,
} from "./signin_signup";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        console.error("Failed to send password reset email.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-center" });
      return; // Prevent further execution if passwords don't match
    }

    try {
      const response = await fetch("/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });

      if (response.ok) {
        toast.success(" Password reset successful", { position: "top-center" });
        // console.log("Password reset successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.warn("Resistered failed", { position: "top-center" });
        // console.error("Failed to reset password");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <form method="POST">
      {!emailSent ? (
        <MainContainer>
          <WelcomeText>Forgot Password Enter Email</WelcomeText>
          <InputContainer>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleEmailChange}
              value={email}
            />
            <ButtonContainer>
              <Button onClick={handleForgotPassword}>Reset Password</Button>
            </ButtonContainer>
          </InputContainer>
        </MainContainer>
      ) : !showNewPasswordFields ? (
        <MainContainer>
          <WelcomeText style={{ marginBottom: "7rem" }}>
            Generate New Password
          </WelcomeText>
          <InputContainer>
            <Input
              type="otp"
              name="otp"
              placeholder="Enter OTP"
              onChange={handleOtpChange}
              value={otp}
            />
            <PasswordContainer>
              <Input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                onChange={handleNewPasswordChange}
                value={newPassword}
              />
              <EyeIcon onClick={handleNewPasswordVisibility}>
                {showNewPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </EyeIcon>
            </PasswordContainer>
            <PasswordContainer>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              <EyeIcon onClick={handleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <VisibilityOffIcon />
                ) : (
                  <RemoveRedEyeIcon />
                )}
              </EyeIcon>
            </PasswordContainer>
            <ButtonContainer>
              <Button onClick={handleResetPassword}>Set New Password</Button>
            </ButtonContainer>
          </InputContainer>
        </MainContainer>
      ) : (
        <h1>updation done successfully</h1>
      )}
      <ToastContainer />
    </form>
  );
}

export default ForgotPassword;
