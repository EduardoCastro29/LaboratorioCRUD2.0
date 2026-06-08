import express from "express";
import PacienteLoginController from "../controller/PacienteLoginController.js";

const router = express.Router();
router.route("/").post(PacienteLoginController.login);

export default router;