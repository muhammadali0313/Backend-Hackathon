import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "6h",
  });
};

const fakeUSerName = () => {
  const username = ["user"];
  for (let i = 0; i < 10; i++) {
    const randomNumber = Math.floor(Math.random() * 1000);
    username.push(`user${randomNumber}`);
  }
  return username.join("");
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const decryptPassword = async (enteredPassword, hashedPassword) => {
  const result = await bcrypt.compare(enteredPassword, hashedPassword);
  if (result) {
    return true;
  } else {
    return false;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  decryptPassword,
  fakeUSerName,
};