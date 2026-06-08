
import mongoose, { Schema, model } from "mongoose";
const expedienteClinicos = new Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
  },
  diagnosis: {
    type: String,
  },
  medications: [
    {
      medicineName: {
        type: String,
      },
    },
  ],
  medicalNotes:{
    type:String
  },
});

export default model("expedienteClinicos", expedienteClinicos);
