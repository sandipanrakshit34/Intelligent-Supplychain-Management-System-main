import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";

/*REGISTER USER*/
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      role,
      employeeId,
      supplierId,
      phoneNumber,
      securityQuestion,
      securityAnswer,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      role,
      location,
      employeeId,
      supplierId,
      securityQuestion,
      securityAnswer: hashedSecurityAnswer,
      phoneNumber,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exsist " });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, securityQuestion: user.securityQuestion });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const resetPasswordSecurity = async (req, res) => {
  const { email, securityAnswer, password } = req.body;

  if (!email || !securityAnswer || !password) {
    return res.status(400).json({
      message: "Email, security answer, and new password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect security answer" });
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      throw new Error("Failed to generate salt");
    }

    user.password = await bcrypt.hash(password, salt);
    if (!user.password) {
      throw new Error("Failed to hash password");
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPasswordSecurity:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
