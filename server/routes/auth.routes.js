import express from "express";

import { signup, login, forgotPassword } from "../controllers/auth.controllers.js";
import { protect } from "../middleware/auth.middleware.js";
import { checkPhone } from "../controllers/auth.controllers.js";
import { resetPasswordWithPhone } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});
router.post(
  "/forgot-password",
  forgotPassword
);
router.post(
  "/reset-password-phone",
  resetPasswordWithPhone
);
router.post(
  "/check-phone",
  checkPhone
);

export default router;