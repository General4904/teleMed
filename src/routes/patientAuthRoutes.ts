import Router from "express";
import {
  createNewPatient,
  getExistingPatient,
  refreshAccessToken,
  logout,
} from "../controllers/patientAuthController";
import authenticatePatient from "../middleware/authentication";
import { getAvailableDoctor } from "../controllers/retrievalAvailableDoctor";
import { bookAppointment } from "../controllers/appointmentBooking";

const router = Router();

router.post("/newPatient", createNewPatient);
router.post("/existingPatient", getExistingPatient);
router.post("/logout", logout);

router.post("/newAccessToken", refreshAccessToken);

router.get("/availableSlots", authenticatePatient, getAvailableDoctor);
router.post("/newAppointment", authenticatePatient, bookAppointment);

export default router;
