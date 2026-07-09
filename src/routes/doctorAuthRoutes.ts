import Router from "express";
import {
  createNewDoctor,
  getExistingDoctor,
  refreshAccessToken,
  logout,
} from "../controllers/doctorAuthController.js";
import authenticateDoctor from "../middleware/authentication.js";
import { setDoctorAvailability } from "../controllers/setDoctorAvailability.js";

const router = Router();

router.post("/newDoctor", createNewDoctor);
router.post("/existingDoctor", getExistingDoctor);
router.post("/logout", logout);

router.post("/newAccessToken", refreshAccessToken);

router.post("/newShift", authenticateDoctor, setDoctorAvailability);

export default router;
