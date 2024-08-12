import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  verificationCode: { type: String, required: true },
  hashPassword: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, expires: "10m", default: Date.now },
});

 const VerificationModel = mongoose.model(
  "Verification",
  VerificationSchema
);
export {VerificationModel}


