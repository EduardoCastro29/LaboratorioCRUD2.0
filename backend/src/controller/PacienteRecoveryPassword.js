import jsonwebtoken from "jsonwebtoken"; 
import bcrypt from "bcryptjs"; 
import crypto, { verify } from "crypto";
import nodemailer from "nodemailer"; 

import { config } from "../../config.js";

import pacienteModel from "../model/pacienteModel.js";
const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  try {
    const { email } = req.body;

    const userFound = await pacienteModel.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: "user not found" });
    }

    const randomCode = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      { email, randomCode, userType: "paciente", verified: false },
      config.jwt.secret,
      { expiresIn: "15m" },
    );
    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email, 
        pass: config.email.user_pass,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Codigo de recuperacion",
      text:
        "Para verificar tu cuenta,Utiliza este codigo: " + " "+
        randomCode + " " + 
        " Expira en 15 minutos",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(200).json({ message: "Error sending email" });
      }
    });
    return res.status(200).json({ message: "email sent" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

recoveryPasswordController.verifyCode = async (req, res) => {
  try {
    const { code } = req.body;
    const token = req.cookies.recoveryCookie;
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (code !== decoded.randomCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

 
    const newToken = jsonwebtoken.sign(
      { email: decoded.email, userType: "paciente", verified: true },
      config.jwt.secret,
      { expiresIn: "15m" },
    );
    res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });
    return res.status(200).json({ message: "code verified succesfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

recoveryPasswordController.newPassword = async (req, res) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "password doesnt match" });
    }

    const token = req.cookies.recoveryCookie;
    const decoded = jsonwebtoken.verify(token, config.jwt.secret);
    if (!decoded.verified) {
      return res.status(400).json({ message: "Code not verified" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await pacienteModel.findOneAndUpdate(
      { email: decoded.email },
      { password: passwordHash },
      { new: true },
    );

    res.clearCookie("recoveryCookie");

    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default recoveryPasswordController;
