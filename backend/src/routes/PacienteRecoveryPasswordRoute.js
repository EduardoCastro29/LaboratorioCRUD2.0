import express from "express";
import pacienteRecoveryPassword from "../controller/PacienteRecoveryPassword.js";

const router = express.Router();
router.route("/requestCode").post(pacienteRecoveryPassword.requestCode);
router.route("/verifyCode").post(pacienteRecoveryPassword.verifyCode);
router.route("/newPassword").post(pacienteRecoveryPassword.newPassword);

export default router;
