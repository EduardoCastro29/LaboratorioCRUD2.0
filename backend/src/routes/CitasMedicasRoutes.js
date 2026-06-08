import express from "express";
import citasMedicasController from "../controller/CitasMedicasController.js";

const router = express.Router();
router.route("/").post(citasMedicasController.insertCitaMedica)
.get(citasMedicasController.getCitaMedica);

router.route("/:id").put(citasMedicasController.updateCitaMedica)
.delete(citasMedicasController.deleteCitaMedica);




export default router;