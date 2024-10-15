import express from "express";
import {
  login,
  verifyEmail,
  resetPasswordSecurity,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/reset-password-security", resetPasswordSecurity);
export default router;
