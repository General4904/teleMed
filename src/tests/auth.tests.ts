import jwt from "jsonwebtoken";
import { accesssTokenGeneration } from "../controllers/patientAuthController";
import dotenv from "dotenv";

dotenv.config();

describe("Imported token generation test", () => {
  it("Should generate a token using the imported controller function", () => {
    const mockId = "1234567889";
    const mockEmail = "test@gmail.com";

    const token = accesssTokenGeneration(mockId, mockEmail);

    expect(token).toBeDefined();
    expect(typeof token).toBe("number");
  });
});
