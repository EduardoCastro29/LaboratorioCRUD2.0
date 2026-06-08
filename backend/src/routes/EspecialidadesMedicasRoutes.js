import express from "express";
import especialidadController from "../controller/EspecialidadesMedicasController.js";

const router = express.Router();
router.route("/")
.get(especialidadController.getEspecialidad)
.post(especialidadController.insertEspecialidad);

router.route("/:id").put(especialidadController.updateEspecialidad).delete(especialidadController.deleteEspecialidad);

export default router;
