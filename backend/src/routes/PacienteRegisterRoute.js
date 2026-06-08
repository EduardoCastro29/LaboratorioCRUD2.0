import express from "express";
import registerPacienteController from "../controller/PacienteRegister.js";
import upload from "../../utils/cloudinary.js";
const router = express.Router();
router.route("/").post(upload.single("profilePhoto"),registerPacienteController.register);
router.route("/verifyCodeEmail").post(upload.single("profilePhoto"),registerPacienteController.verifyCode);

export default router;