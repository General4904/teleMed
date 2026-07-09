import Patient from "../models/patient.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

//Token generation
// ==> Access token
export function accesssTokenGeneration(userId: any, email: string) {
  const payload = { userId, email };
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, secret, {
    expiresIn: `15m`,
  });

  return token;
}

// Register new user
export const createNewPatient = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      middlename,
      email,
      password,
      genotype,
      bloodGroup,
    } = req.body;

    const existingPatient = await Patient.findOne({ email });

    if (existingPatient) {
      return res.status(409).json({
        message: `Patient already exist with this email`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPatient = new Patient({
      firstname: firstname,
      lastname: lastname,
      middlename: middlename,
      email: email,
      password: hashedPassword,
      genotype: genotype,
      bloodGroup: bloodGroup,
    });

    await newPatient.save();

    res.status(201).json({
      message: "New patient added",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Patient already exist",
      });
    }
    res.status(500).json({
      message: "Error creating new patient",
    });
    console.error(error);
  }
};

// Login existing user
export const getExistingPatient = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const patient = await Patient.findOne({ email }).select("+password");

    if (!patient) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, patient.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: `Invalid credentials`,
      });
    }

    //Token generation
    //==> Refresh token
    const refreshToken = crypto.randomBytes(40).toString("hex");
    const accessToken = accesssTokenGeneration(patient._id, patient.email);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });

    await Patient.db.collection("patient_refresh_tokens").insertOne({
      token: refreshToken,
      _id: patient._id,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: `Login successful, welcome ${patient.lastname}`,
      token: accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Server error`,
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: `Refresh token required`,
      });
    }
    const savedToken = await Patient.db
      .collection("patient_refresh_tokens")
      .findOne({
        token: refreshToken,
      });

    if (!savedToken) {
      return res.status(403).json({
        message: `Invalid or expired refresh token`,
      });
    }

    const patient = await Patient.findById(savedToken.patientId);

    if (!patient) {
      return res.status(404).json({
        message: `Patient profile no longer exists`,
      });
    }

    const newAccessToken = accesssTokenGeneration(patient._id, patient.email);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Server error`,
    });
  }
};

// Log out
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      await Patient.db.collection("patient_refresh_tokens").deleteOne({
        token: refreshToken,
      });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.COOKIE_SECURE === "true",
    });

    res.status(200).json({
      message: `Logged out successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error during log out`,
    });
  }
};
