import { Request, Response } from "express";
import Appointment from "../models/appointments.js";
import Patient from "../models/patient.js";
import doctorAvailability from "../models/doctorAvailability.js";

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const { patientId, slotId } = req.body;
    const slot = await doctorAvailability.findById(slotId);

    if (!slot) {
      return res.status(404).json({
        message: `The requested time slot unavailable`,
      });
    }

    if (slot.isBooked) {
      return res.status(409).json({
        message: `Slot already taken`,
      });
    }

    slot.isBooked = true;
    await slot.save();

    const newAppointment = new Appointment({
      patientId: patientId,
      doctorId: slot.doctorId,
      slotId: slot._id,
      appointmentTime: slot.slotStart,
    });

    res.status(200).json({
      message: `Appointment successfully booked`,
      appointmentId: newAppointment._id,
      time: slot.slotStart.toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
  }
};
