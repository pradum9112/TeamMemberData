const express = require("express");
const signUprouter = express.Router();
const SIGNUPNUSER = require("../models/userSignUpSchema");
const FORGOTPASSWORDOTP = require("../models/forgotPasswordOtpSchema");
const bcrypt = require("bcryptjs"); //login password encryption
const nodemailer = require("nodemailer");

//for signuser data api
signUprouter.post("/signupregister", async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(422).json({ Error: "Please... fill the data" });
    console.log("fill the data");
  }

  try {
    const preuser = await SIGNUPNUSER.findOne({ email: email });
    if (preuser) {
      res.status(422).json("this signupuser is already present");
    } else {
      const finalsignupuser = new SIGNUPNUSER({
        name,
        email,
        password,
      });

      const storesignupuser = await finalsignupuser.save();
      console.log(storesignupuser);
      res.status(201).json(storesignupuser);
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

//login user api
signUprouter.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "fill all the data" });
  }
  try {
    const userlogin = await SIGNUPNUSER.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      if (!isMatch) {
        res.status(422).json({ error: "Invalid Details" });
      } else {
        res.status(201).json(userlogin);
      }
    } else {
      res.status(422).json({ error: "Invalid Details" });
    }
  } catch (error) {
    res.status(422).json({ error: "Invalid detail" });
  }
});

signUprouter.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email:", email);

    const user = await SIGNUPNUSER.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.password,
      },
    });

    let mailOptions = {
      from: process.env.user,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${generatedOTP}`,
    };

    const otpEntry = await FORGOTPASSWORDOTP.findOneAndDelete({ email });

    const newOTPEntry = new FORGOTPASSWORDOTP({
      email,
      otp: generatedOTP,
    });

    await newOTPEntry.save();
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send OTP email" });
  }
});

signUprouter.post("/resetpassword", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await SIGNUPNUSER.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpEntry = await FORGOTPASSWORDOTP.findOneAndDelete({ email, otp });
    if (!otpEntry) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = newPassword; // Assuming the password field is named 'password'
    await user.save();

    res
      .status(200)
      .json({ message: "OTP verified successfully, password updated" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
});

module.exports = signUprouter;
