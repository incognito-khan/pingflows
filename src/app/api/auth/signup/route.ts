import { NextResponse } from "next/server";
import { hashPassword } from "../../../../lib/hash"
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, fullName } = body;

    // ❌ Basic validation (yes, you need this)
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // ❌ Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await hashPassword(password);

    // ✅ Create user + workspace in ONE transaction
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        workspace: {
          create: {
            name: `${fullName}'s Workspace`,
          },
        },
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: user, status: 201, success: true });
  } catch (error) {
    console.error("SIGNUP_ERROR", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}