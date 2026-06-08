
import mongoose, { Schema, model } from "mongoose";
const pacienteSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  birthdate: {
    type: String,
  },

  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  bloodType: {
    type: String,
  },
  phoneEmergencyContacts: [
    {
      phone: {
        type: String,
      },
      nameEmergencyContact: {
        type: String,
      },
    },
  ],
  profilePhoto: {
    type: String,
  },
  public_Id: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  loginAttempts: {
    type: Number,
  },
  timeOut: {
    type: Date,
  },
});

export default model ("Paciente",pacienteSchema);
