import citaMedicaModel from "../model/citasMedicas.js";

const citaMedicaController = {};

citaMedicaController.getCitaMedica = async (req, res) => {
  try {
    const cita = await citaMedicaModel.find();
    return res.status(200).json(cita);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

citaMedicaController.insertCitaMedica = async (req, res) => {
  try {
    const {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    } = req.body;

    const newCita = new citaMedicaModel({
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
      //image: req.file.path,
      //public_id: req.file.filename,
    });

    await newCita.save();
    return res.status(200).json({ message: "especialidad saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

citaMedicaController.updateCitaMedica = async (req, res) => {
  try {
    const {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    } = req.body;
    const updateDate = {
      patient_id,
      specialty_id,
      appointmentDate,
      reason,
      status,
      observations,
    };
    await citaMedicaModel.findByIdAndUpdate(req.params.id, updateDate, {
      new: true,
    });
    return res.status(200).json({ message: "Especialidad updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

citaMedicaController.deleteCitaMedica = async (req, res) => {
  try {
    await citaMedicaModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "especialidad deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export default citaMedicaController;
