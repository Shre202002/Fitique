import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      email?: string;
      role?: string;
    };

    if (decoded.role !== "buyer") {
      return NextResponse.json(
        { error: "Access denied. Buyer account required." },
        { status: 403 }
      );
    }

    const user = await User.findOne({ "buyer.email": decoded.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return complete buyer details
    const buyer = user.buyer;
    return NextResponse.json({
      firstName: buyer.firstName,
      lastName: buyer.lastName,
      email: buyer.email,
      phone: buyer.phone,
      address: buyer.address,
      state: buyer.state,
      city: buyer.city,
      pincode: buyer.pincode,
      role: decoded.role,
    });
  } catch (error: any) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
