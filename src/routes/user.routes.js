import express from "express";
import {
  registerUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getSingleUser
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);

export default router;