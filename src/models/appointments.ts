import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  slotId: mongoose.Types.ObjectId;
  appointmentTime: Date;
  status: string;
}

const appointmentSchema: Schema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },

    slotId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "DoctorAvailability",
    },

    appointmentTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      default: "Scheduled",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
