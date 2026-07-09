import dotenv from "dotenv";
import express, { Request, Response } from "express";
import patient from "./routes/patientAuthRoutes";
import doctor from "./routes/doctorAuthRoutes";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth/patient/v1", patient); // endpoint for patients
app.use("/api/auth/doctor/v1", doctor); // endpoint for doctors

if (!MONGO_URI) {
  throw new Error();
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to database successfully`);
  })
  .catch((error) => {
    console.error(`Error connecting to database: ${error}`);
  });

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to my backyard`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
