import { Request, Response } from "express";
import doctorAvailability from "../models/doctorAvailability.js";
import Doctor from "../models/doctor.js";

export const setDoctorAvailability = async (req: Request, res: Response) => {
  try {
    const { date, startHour, endHour, slotDurationMinutes, doctorId } =
      req.body;

    const verifiedDoctor = await Doctor.findById({ doctorId });

    if (!verifiedDoctor) {
      return res.status(404).json({
        message: `User doesn't exist`,
      });
    }

    const slotsToInsert = [];

    let currentSlotTime = new Date(
      `${date}T${String(startHour).padStart(2, "0")}:00:00`,
    );
    const endTime = new Date(
      `${date}T${String(endHour).padStart(2, "0")}:000:00`,
    );

    while (currentSlotTime < endTime) {
      slotsToInsert.push({
        doctorId: verifiedDoctor._id,
        slotStart: new Date(currentSlotTime),
        isBooked: false,
      });

      currentSlotTime.setMinutes(
        currentSlotTime.getMinutes() + slotDurationMinutes,
      );
    }

    await doctorAvailability.insertMany(slotsToInsert, {
      ordered: false,
    });

    res.status(201).json({
      message: `Successfully generated ${slotsToInsert.length} appointment slots for this day.`,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(200).json({
        message: `Availability processed. Duplicate slots were automatically skipped`,
      });
    }
    console.error(error);
    res.status(500).json({
      message: `Server error setting availability`,
    });
  }
};
