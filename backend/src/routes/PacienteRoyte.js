import express from "express";
import PacienteController from "../controller/Paciente.js";
const router = express.Router();
router.route("/").get(PacienteController.getPaciente);

router
  .route("/:id")
  .put(PacienteController.updatePaciente)
  .delete(PacienteController.deletePaciente);

export default router;
