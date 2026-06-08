import pacienteModel from "../model/pacienteModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

const loginPacienteController = {};

loginPacienteController.login = async (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  try {
    const pacienteFound = await pacienteModel.findOne({ email });
    if (!pacienteFound) {
      return res.status(400).json({ message: "Paciente not foud" });
    }

    if (pacienteFound.timeOut && pacienteFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Cuenta bloqueada" });
    }

    const isMatch = await bcrypt.compare(password, pacienteFound.password);

    if (!isMatch) {
      pacienteFound.loginAttempts = (pacienteFound.loginAttempts || 0) + 1;

      if (pacienteFound.loginAttempts >= 5) {
        pacienteFound.timeOut = Date.now() + 5 * 60 * 1000;
        pacienteFound.loginAttempts = 0;

        await pacienteFound.save();

        return res
          .status(403)
          .json({
            message: "Cuenta bloqueada por multiples intentos fallidos",
          });
      }
      await pacienteFound.save();

      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    pacienteFound.loginAttempts = 0;
    pacienteFound.timeOut = null;

    const token = jsonwebtoken.sign(
      { id: pacienteFound._id, userType: "Paciente" },
      config.jwt.secret,
      { expiresIn: "30d" },
    );

    res.cookie("authCookie", token);

    return res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginPacienteController;
