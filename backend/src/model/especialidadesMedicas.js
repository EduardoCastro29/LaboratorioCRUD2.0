
import { Schema, model } from "mongoose";
const especialidadMedica = new Schema({
  specialtyName: {
    type: String,
  },
  description: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
  },
  
});

export default model ("especialidad",especialidadMedica);
