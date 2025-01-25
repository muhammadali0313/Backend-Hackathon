import {
    generateAccessToken,
    generateRefreshToken,
    decryptPassword,
    fakeUSerName,
  } from "../methods/authenticationMethod.js";
  import { userModel } from "../models/users.models.js";
  
  const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });
  
    const ifEmailFound = await userModel.findOne({ email });
    if (ifEmailFound)
      return res.status(400).json({ message: "Email already exists" });
  
    const newUser = await userModel.create({
      name: name ? name : fakeUSerName(),
      email,
      password,
    });
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User registered successfully",
      data: newUser,
      ACCESS_TOKEN: accessToken,
    });
  };
  
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });
  
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user exists with this email address" });
    }
  
    const isValidPassword = await decryptPassword(password, user?.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    } else {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
        http: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        message: "User logged in successfully",
        data: user,
        ACCESS_TOKEN: accessToken,
      });
    }
  };
  
  const logOutUser = async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "User logged out successfully" });
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find(); 
      res.status(200).json({ message: "Users retrieved successfully", data: users });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  };
  
  const getSingleUser = async (req, res) => {
    const { id } = req.params; // Extract user ID from request parameters
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User retrieved successfully", data: user });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  };
  export { registerUser, loginUser, logOutUser, getAllUsers, getSingleUser };
