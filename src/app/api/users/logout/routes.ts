import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";


export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { role?: string; email?: string };

    return NextResponse.json({
      name: decoded.name,
      email: decoded.email,
    });
  } catch (error) {
    console.error("Profile route error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
