// src/app/api/verify-otp/route.ts
import { NextResponse } from "next/server";
import { otpStore } from "../send-otp/route";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();
    if (!email || !otp)
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });

    const record = otpStore.get(email);

    if (!record) return NextResponse.json({ error: "OTP not found. Request a new one." }, { status: 400 });
    if (Date.now() > record.expires) {
      otpStore.delete(email);
      return NextResponse.json({ error: "OTP expired. Request a new one." }, { status: 400 });
    }
    if (record.otp !== otp)
      return NextResponse.json({ error: "Invalid OTP. Try again." }, { status: 400 });

    otpStore.delete(email);
    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: error.message || "Failed to verify OTP" }, { status: 500 });
  }
}
