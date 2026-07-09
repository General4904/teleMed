import Router from "express";
import {
  createNewDoctor,
  getExistingDoctor,
  refreshAccessToken,
  logout,
} from "../controllers/doctorAuthController";
import authenticateDoctor from "../middleware/authentication";
import { setDoctorAvailability } from "../controllers/setDoctorAvailability";

const router = Router();

router.post("/newDoctor", createNewDoctor);
router.post("/existingDoctor", getExistingDoctor);
router.post("/logout", logout);

router.post("/newAccessToken", refreshAccessToken);

router.post("/newShift", authenticateDoctor, setDoctorAvailability);

export default router;
