import express from "express";
import { getMe, login, logout, refreshAccessToken, signup } from "../Controllers/user.js";
import { protect } from "../Middlewares/auth.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshAccessToken);
router.get("/me", protect, getMe);

export default router;
