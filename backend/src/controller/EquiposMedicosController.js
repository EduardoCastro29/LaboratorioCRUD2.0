import equiposMedicoModel from "../model/citasMedicas.js";

const equiposMedicosController = {};

equiposMedicosController.getEquiposMedicos = async (req, res) => {
  try {
    const equipo = await equiposMedicoModel.find();
    return res.status(200).json(equipo);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

equiposMedicosController.insertEquipoMedico = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      location,
      status,
      isAvailable,
    } = req.body;

    const newEquipo = new equiposMedicoModel({
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      location,
      status,
      isAvailable,
      image: req.file.path,
      public_id: req.file.filename,
    });

    await newEquipo.save();
    return res.status(200).json({ message: "Equipo saved" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

equiposMedicosController.updateEquipo = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      location,
      image,
      status,
      isAvailable,
    } = req.body;
    const equipo = await equiposMedicoModel.findById(req.params.id);

    const updateDate = {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenanceDate,
      location,
      image,
      status,
      isAvailable,
    };
    if (req.file) {
      await cloudinary.uploader.destroy(equipo.public_Id);
      updateDate.profilePhoto = req.file.path;
      updateDate.public_Id = req.file.filename;
    }
    await equiposMedicoModel.findByIdAndUpdate(req.params.id, updateDate, {
      new: true,
    });
    return res.status(200).json({ message: "equipo updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

equiposMedicosController.deleteEquipo = async (req, res) => {
  try {
    const equipoFound = await pacienteModel.findById(req.params.id);
    await cloudinary.uploader.destroy(equipoFound.public_Id);
    await equiposMedicoModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "equipo deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export default equiposMedicosController;
