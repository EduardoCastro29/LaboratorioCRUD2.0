
import mongoose, { Schema, model } from "mongoose";
const citasMedicas = new Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
  },
  specialty_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "especialidad",
  },
  appointmentDate: {
    type: Date,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
  },
  observations: {
    type: String,
  },
});

export default model("citasMedicas", citasMedicas);
