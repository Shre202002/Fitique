import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    // Fetch user
    const user = await User.findOne({ role: 'buyer', 'buyer.email': email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate OTP
    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    if (!user.otpExpires || new Date() > new Date(user.otpExpires)) {
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
    }

    // Clear OTP after verification
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    

    // Generate JWT for session
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.buyer.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Return JSON and set HttpOnly cookie so server-side middleware can read session
    const res = NextResponse.json({ message: 'Login successful', token }, { status: 200 });

    const maxAge = 60 * 60; // 1 hour
    const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure; ' : '';
    res.headers.set(
      'Set-Cookie',
      `token=${token}; Path=/; HttpOnly; SameSite=Lax; ${secureFlag}Max-Age=${maxAge}`
    );

    return res;
  } 
  catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
