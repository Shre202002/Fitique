import mongoose, { Schema, models } from "mongoose";

const BuyerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  password: { type: String, required: true },

});

const TailorSchema = new Schema({
  fullName: String,
  emailAddress: String,
  phoneNumber: String,
  dateOfBirth: String,
  profilePhoto: String,
  businessName: String,
  yearsOfExperience: Number,
  specializations: [String],
  businessDescription: String,
  portfolioImages: [String],
  businessAddress: String,
  city: String,
  state: String,
  pincode: String,
  businessLicense: String,
  agreesToTerms: Boolean,
  agreesToCommission: Boolean,
});

const UserSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["buyer", "tailor"],
      required: true,
    },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    buyer: BuyerSchema,
    tailor: TailorSchema,
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
