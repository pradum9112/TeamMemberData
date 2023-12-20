// import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  // left-margin:40rem;
  height: 60vh;
  width: 30vw;
  margin-top:4rem;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  gap: 4rem;
  span {
    color: #f78719;
  }
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 321px) {
    width: 60vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  
  @media only screen and (min-width: 1280px) {t
    width: 40vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 6rem 0 2rem 0;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
  gap: 3rem;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const ForgotPassword = styled.h4`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #1575a7;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #1565a9;
  }
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem grey;
    backdrop-filter: blur(12rem);
    border-radius: 10px;
  }
  &::placeholder {
    color: black;
    font-weight: 100;
    font-size: 1rem;
  }
`;
const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 7rem;
  transform: translateY(-50%);
  cursor: pointer;
  /* Responsive Styles */
  @media (max-width: 1120px) {
    right: 5rem;
  }
  @media (max-width: 920px) {
    right: 4rem;
  }
  @media (max-width: 720px) {
    right: 3rem;
  }
  @media (max-width: 480px) {
    right: 2rem;
  }
`;

export {
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
};
