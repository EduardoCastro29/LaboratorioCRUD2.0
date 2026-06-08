import express from "express";
import citasMedicasController from "../controller/CitasMedicasController.js";
import upload from "../../utils/cloudinary.js";

const router = express.Router();
router
  .route("/")
  .post(upload.single("image"), citasMedicasController.insertCitaMedica)
  .get(citasMedicasController.getCitaMedica);

router
  .route("/:id")
  .put(upload.single("image"), citasMedicasController.updateCitaMedica)
  .delete(citasMedicasController.deleteCitaMedica);

export default router;
