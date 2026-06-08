import express from "express";
import logoutController from "../controller/PacienteLogoutController.js";

const router = express.Router();
router.route("/").post(logoutController.logout);

export default router;