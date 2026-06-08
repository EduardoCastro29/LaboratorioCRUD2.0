import express from "express";
import expedienteClinico from "../controller/ExpedienteClinicoController.js";

const router = express.Router();
router.route("/").post(expedienteClinico.insertExpediente)
.get(expedienteClinico.getExpediente);

router.route("/:id").put(expedienteClinico.updateExpediente)
.delete(expedienteClinico.deleteExpediente);




export default router;