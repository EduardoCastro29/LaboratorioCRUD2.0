import expedienteModel from "../model/expedientesClinicos.js";

const expedienteController = {};

expedienteController.getExpediente = async (req, res) => {
  try {
    const cita = await expedienteModel.find();
    return res.status(200).json(cita);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

expedienteController.insertExpediente = async (req, res) => {
  try {
    const { patient_id, diagnosis, medications, medicalNotes } = req.body;

    const newExpediente = new expedienteModel({
      patient_id,
      diagnosis,
      medications,
      medicalNotes,

      //image: req.file.path,
      //public_id: req.file.filename,
    });

    await newExpediente.save();
    return res.status(200).json({ message: "expediente saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

expedienteController.updateExpediente = async (req, res) => {
  try {
    const { patient_id, diagnosis, medications, medicalNotes } = req.body;
    const updateDate = {
      patient_id,
      diagnosis,
      medications,
      medicalNotes,
    };
    await expedienteModel.findByIdAndUpdate(req.params.id, updateDate, {
      new: true,
    });
    return res.status(200).json({ message: "expediente updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

expedienteController.deleteExpediente = async (req, res) => {
  try {
    await expedienteModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "expediente deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export default expedienteController;
