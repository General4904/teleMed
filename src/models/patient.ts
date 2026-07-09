import { Schema, model } from "mongoose";

interface IPatient {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  middlename?: string;
  genotype: string;
  bloodGroup: string;
}

const patientSchema = new Schema<IPatient>({
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

  genotype: {
    type: String,
    required: true,
  },
});

const Patient = model("Patient", patientSchema);

export default Patient;
