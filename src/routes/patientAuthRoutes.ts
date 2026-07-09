import Router from "express";
import {
  createNewPatient,
  getExistingPatient,
  refreshAccessToken,
  logout,
} from "../controllers/patientAuthController.js";
import authenticatePatient from "../middleware/authentication.js";
import { getAvailableDoctor } from "../controllers/retrievalAvailableDoctor.js";
import { bookAppointment } from "../controllers/appointmentBooking.js";

const router = Router();

router.post("/newPatient", createNewPatient);
router.post("/existingPatient", getExistingPatient);
router.post("/logout", logout);

router.post("/newAccessToken", refreshAccessToken);

router.get("/availableSlots", authenticatePatient, getAvailableDoctor);
router.post("/newAppointment", authenticatePatient, bookAppointment);

export default router;
