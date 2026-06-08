import especialidadModel from "../model/especialidadesMedicas.js";

const especialidadController = {};

especialidadController.getEspecialidad = async (req, res) => {
  try {
    const especialidad = await especialidadModel.find();
    return res.status(200).json(especialidad);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

especialidadController.insertEspecialidad = async (req, res) => {
  try {
    const { specialtyName, description, isAvailable } = req.body;

    const newEspecialidad = new especialidadModel({
      specialtyName,
      description,
      isAvailable,
      //image: req.file.path,
      //public_id: req.file.filename,
    });

    await newEspecialidad.save();
    return res.status(200).json({ message: "especialidad saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

especialidadController.updateEspecialidad = async (req, res) => {
  try {
    const { specialtyName, description, isAvailable } = req.body;
    const updateDate = {
      specialtyName,
      description,
      isAvailable,
    };
    await especialidadModel.findByIdAndUpdate(req.params.id, updateDate, {
      new: true,
    });
    return res.status(200).json({ message: "Especialidad updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

especialidadController.deleteEspecialidad = async (req, res) => {
  try {
    await especialidadModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "especialidad deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export default especialidadController;
