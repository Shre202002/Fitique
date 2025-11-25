// src/app/api/send-otp/route.ts
import User from "@/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const otpStore = new Map<string, { otp: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await User.findOne({ role: 'buyer', 'buyer.email': email });
    if (user) {
      return NextResponse.json({ error: 'Email Already registered as buyer' }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore.set(email, { otp, expires });

    // Configure SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // change if using another provider
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"YourApp" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your Verification ${otp} Code`,
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: error.message || "Failed to send OTP" }, { status: 500 });
  }
}

export { otpStore };
