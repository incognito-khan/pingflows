import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { comparePassword } from "@/src/lib/hash";
import { signJwt } from "@/src/lib/token";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json(
            { error: "Email and password required" },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            workspace: true,
        },
    });

    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    // ✅ Create JWT
    const token = await signJwt({
        sub: user.id,
        email: user.email,
        workspaceId: user.workspace?.id ?? null,
    });

    return NextResponse.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            workspace: user.workspace
        },
        status: 200,
        success: true
    });
}
