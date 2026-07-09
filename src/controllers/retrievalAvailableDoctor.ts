import doctorAvailability from "../models/doctorAvailability.js";
import Doctor from "../models/doctor.js";
import { Request, Response } from "express";

export const getAvailableDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorID, date } = req.query;

    if (!doctorID || !date) {
      return res.status(400).json({
        message: `Both Doctor's ID and date are required`,
      });
    }

    const doctor = await Doctor.findById(doctorID);

    if (!doctor) {
      return res.status(404).json({
        message: `Doctor doesn't exist in the record`,
      });
    }

    const beginningOfDay = new Date(`${date}T00.00.00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59:999Z`);

    const availableSlots = await doctorAvailability
      .find({
        doctorId: doctor._id,
        isBooked: false,
        slotStart: {
          $gte: beginningOfDay,
          $lte: endOfDay,
        },
      })
      .sort({ slotStart: 1 });

    res.status(200).json({
      message: `Sucessfully retrieved ${availableSlots.length} available slots for Dr. ${doctor.lastname}`,
      doctorDetails: {
        doctorId: doctor._id,
        doctorName: `Dr. ${doctor.lastname}`,
        specialty: doctor.specialty,
      },

      availableTimes: availableSlots.map((slot) => ({
        slotId: slot._id,
        formattedTime: slot.slotStart.toISOString().substring(11, 16),
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Server error`,
    });
  }
};
