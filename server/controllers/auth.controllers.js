import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User from "../models/User.models.js";

export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const cleanPhone = String(phone).replace(/^0+/, "");

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Account already exists. Please login.",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingPhone = await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already exists",
      });
    }

    // create user
    const user = await User.create({
      name,
      email,
      phone: cleanPhone,
      password: hashedPassword,
    });

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // CHECK USER
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // GENERATE TOKEN
    const resetToken =
      crypto.randomBytes(32).toString("hex");

    // SAVE TOKEN
    user.resetPasswordToken = resetToken;

    // EXPIRES IN 15 MIN
    user.resetPasswordExpires =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // RESET LINK
    const resetLink =
      `http://localhost:5173/reset-password/${resetToken}`;

    res.status(200).json({
      message: "Reset link generated",
      resetLink,
      userName: user.name,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const checkPhone = async (req, res) => {
  console.log(req.body);
  try {

    const { phone } = req.body;
    const cleanPhone =
  String(phone).replace(/^0+/, ""); 

    const user =
      await User.findOne({
        phone,
      });

    if (!user) {
      return res.status(404).json({
        exists: false,
        message:
          "No account linked with this phone number",
      });
    }

    res.status(200).json({
      exists: true,
    });

  } catch (error) {

    res.status(500).json({
      message:
        "Server error",
    });
  }
};