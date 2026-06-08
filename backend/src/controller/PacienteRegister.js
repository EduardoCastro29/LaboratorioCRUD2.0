import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pacienteModel from "../model/pacienteModel.js";
import { config } from "../../config.js";

const registerPacienteController = {};

// Registrar paciente
registerPacienteController.register = async (req, res) => {
  const {
    name,
    lastName,
    email,
    password,
    birthDate,
    phone,
    address,
    bloodType,
    phoneEmergencyContacts,
  } = req.body;

  try {
    const existPaciente = await pacienteModel.findOne({ email });

    if (existPaciente) {
      return res.status(400).json({
        message: "Paciente ya existe",
      });
    }

    const passwordHashed = await bcrypt.hash(password, 10);
    const randomNumber = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      {
        randomNumber,
        name,
        lastName,
        email,
        password: passwordHashed,
        birthDate,
        phone,
        address,
        bloodType,
        phoneEmergencyContacts,
        profilePhoto: req.file.path,
        public_id: req.file.filename,
      },
      config.jwt.secret,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("registrationCookie", token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_pass,
      },
    });

    const mailOption = {
      from: config.email.user_email,
      to: email,
      subject: "Verificación de cuenta",
      text: `Verifica con el código: ${randomNumber}`,
    };

    transporter.sendMail(mailOption, (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error sending mail",
        });
      }

      return res.status(201).json({
        message: "Email sent",
      });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Verificar código
registerPacienteController.verifyCode = async (req, res) => {
  try {
    const { verificationCodeRequest } = req.body;

    const token = req.cookies.registrationCookie;

    if (!token) {
      return res.status(401).json({
        message: "Token no encontrado",
      });
    }

    const decoded = jsonwebtoken.verify(token, config.jwt.secret);

    const {
      randomNumber: storedCode,
      name,
      lastName,
      email,
      password,
      birthDate,
      phone,
      address,
      bloodType,
      phoneEmergencyContacts,
      profilePhoto,
    } = decoded;

    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({
        message: "Código inválido",
      });
    }

    const newPaciente = new pacienteModel({
      name,
      lastName,
      email,
      password,
      birthDate,
      phone,
      address,
      bloodType,
      phoneEmergencyContacts,
      profilePhoto,
    });

    await newPaciente.save();

    res.clearCookie("registrationCookie");

    return res.status(201).json({
      message: "Paciente registrado correctamente",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default registerPacienteController;
