import mongoose, { Schema, Document } from "mongoose";

export interface IDoctorAvailability extends Document {
  doctorId: mongoose.Types.ObjectId;
  slotStart: Date;
  isBooked: boolean;
}

const doctorAvailabilitySchema: Schema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },

  slotStart: {
    type: Date,
    required: true,
  },

  isBooked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

doctorAvailabilitySchema.index(
  {
    doctorId: 1,
    slotStart: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model<IDoctorAvailability>(
  "Doctor_Availability",
  doctorAvailabilitySchema,
);
