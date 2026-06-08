
import { Schema, model } from "mongoose";
const equiposMedicos = new Schema({
  equipmentName: {
    type: String,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  purchaseDate: {
    type: Date,
  },
  maintenanceDate: {
    type: Date,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  public_id: {
    type: String,
  },
  status: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
  },
  
});

export default model ("equiposMedicos",equiposMedicos);
