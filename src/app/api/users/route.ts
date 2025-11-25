import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { log } from "console";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { role } = body;
    console.log(typeof (body));

    if (!role) {

      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    let userData;

    // ------------------ BUYER SECTION ------------------
    if (role === "buyer") {
      const { firstName, lastName, address, email, phone, pincode, city, state, password } = body;
      const pinNum = Number(pincode);
      const phoneNum = Number(phone);

      if (
        !firstName ||
        !lastName ||
        !email ||
        !address ||
        !city ||
        !state ||
        !password ||
        isNaN(phoneNum) ||
        phoneNum < 1000000000 ||
        isNaN(pinNum) ||
        pinNum < 100000 ||
        pinNum > 999999
      ) {
        return NextResponse.json(
          { error: "Invalid or missing Buyer fields" },
          { status: 400 }
        );
      }
      // 🔍 Check if buyer with same email or phone already exists
      const existingUser = await User.findOne({
        $or: [
          { "buyer.email": email },
          { "buyer.phone": phoneNum }
        ],
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "User already registered. Please login instead." },
          { status: 409 } // 409 Conflict
        );
      }

      userData = {
        role,
        buyer: {
          firstName,
          lastName,
          address,
          email,
          phone: phoneNum,
          pincode: pinNum,
          city,
          state,
          password
        },
      };

      console.log("Buyer Data:", userData);
    }

    // ------------------ TAILOR SECTION ------------------
    else if (role === "tailor") {
      const {
        fullName,
        emailAddress,
        phoneNumber,
        dateOfBirth,
        profilePhoto,
        businessName,
        yearsOfExperience,
        specializations,
        businessDescription,
        portfolioImages,
        businessAddress,
        city,
        state,
        pincode,
        businessLicense,
        agreesToTerms,
        agreesToCommission,
      } = body;

      const phoneNum = Number(phoneNumber);
      const pinNum = Number(pincode);
      const experienceNum = Number(yearsOfExperience);

      if (
        !fullName ||
        !emailAddress ||
        !businessName ||
        isNaN(phoneNum) ||
        phoneNum < 1000000000 ||
        phoneNum > 9999999999 ||
        isNaN(pinNum) ||
        pinNum < 100000 ||
        pinNum > 999999 ||
        isNaN(experienceNum) ||
        experienceNum < 0 ||
        experienceNum > 60
      ) {
        return NextResponse.json(
          { error: "Invalid or missing Tailor fields" },
          { status: 400 }
        );
      }

      userData = {
        role,
        tailor: {
          fullName,
          emailAddress,
          phoneNumber: phoneNum,
          dateOfBirth,
          profilePhoto,
          businessName,
          yearsOfExperience: experienceNum,
          specializations,
          businessDescription,
          portfolioImages,
          businessAddress,
          city,
          state,
          pincode: pinNum,
          businessLicense,
          agreesToTerms,
          agreesToCommission,
        },
      };
    }

    // ------------------ INVALID ROLE ------------------
    else {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // ------------------ CREATE USER ------------------
    const newUser = await User.create(userData);
    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ------------------ GET ALL USERS ------------------
export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
