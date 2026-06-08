import pacienteModel from "../model/pacienteModel.js";
import { v2 as cloudinary } from "cloudinary";

const pacienteController = {};

// Método Get 
pacienteController.getPaciente = async (req, res) => {
  try {
    const pacientes = await pacienteModel.find();
    return res.status(200).json(pacientes);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



pacienteController.updatePaciente = async (req, res) => {
  try {
    const { name, lastName, email, password, birthdate, phone, address, bloodType, phoneEmergencyContacts, isVerified, loginAttempts, timeOut } = req.body;
    const pacienteFound = await pacienteModel.findById(req.params.id);

    const updateDate = {
      name,
      lastName,
      email,
      password,
      birthdate,
      phone,
      address,
      bloodType,
      phoneEmergencyContacts,
      isVerified,
      loginAttempts,
      timeOut
    };
    if (req.file) {
      await cloudinary.uploader.destroy(pacienteFound.public_Id);
      updateDate.profilePhoto = req.file.path;
      updateDate.public_Id = req.file.filename;
    }
    await pacienteModel.findByIdAndUpdate(req.params.id, updateDate, {
      new: true,
    });
    return res.status(200).json({ message: "paciente updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

pacienteController.deletePaciente = async (req, res) => {
  try {
    const pacienteFound = await pacienteModel.findById(req.params.id);
    await cloudinary.uploader.destroy(pacienteFound.public_Id);
    await pacienteModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({message: "paciente deleted"});
 
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export default pacienteController;

