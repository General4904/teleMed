import { Schema, model } from "mongoose";

export interface IDoctor {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  middlename?: string;
  genotype: string;
  specialty: string;
  bloodGroup: string;
}

const doctorSchema = new Schema<IDoctor>({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  middlename: {
    type: String,
  },

  password: {
    type: String,
    select: false,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  bloodGroup: {
    type: String,
    required: true,
  },

  specialty: {
    type: String,
    required: true,
  },

  genotype: {
    type: String,
    required: true,
  },
});

const Doctor = model("Doctor", doctorSchema);

export default Doctor;
