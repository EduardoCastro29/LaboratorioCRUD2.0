import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import PacienteRegisterRoute from "./src/routes/PacienteRegisterRoute.js";
import PacienteRoute from "./src/routes/PacienteRoyte.js";
import PacienteLoginRoutes from "./src/routes/PacienteLoginRoutes.js";
import PacienteRecoveryPasswordRoutes from "./src/routes/PacienteRecoveryPasswordRoute.js";
import PacienteLogoutRoute from "./src/routes/PacienteLogoutRoute.js";

import EspecialidadRoutes from "./src/routes/EspecialidadesMedicasRoutes.js";
import CitaMedicaRoutes from "./src/routes/CitasMedicasRoutes.js";
import ExpedienteRoutes from "./src/routes/ExpedientesClinicosRoutes.js";
import EquipoRoutes from "./src/routes/EquiposMedicosRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5137", "http://localhost/5174"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/paciente/register", PacienteRegisterRoute);
app.use("/api/paciente", PacienteRoute);
app.use("/api/paciente/loginPaciente", PacienteLoginRoutes);
app.use("/api/paciente/recoveryPassword", PacienteRecoveryPasswordRoutes);
app.use("/api/paciente/logout", PacienteLogoutRoute);

// CRUDS NORMALES
app.use("/api/especialidad", EspecialidadRoutes);
app.use("/api/citaMedica", CitaMedicaRoutes);
app.use("/api/expediente", ExpedienteRoutes);
app.use("/api/equipoMedico", EquipoRoutes);

export default app;
