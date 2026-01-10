import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";

// const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET = "QwZjXnBU6OlomJykSvf4TYWmTpPO4vtAqFaIL2"
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const JWT_EXPIRES_IN = "7d";

export type AppJwtPayload = {
    sub: string;
    email: string;
    workspaceId?: string | null;
};

type VerifyAccessResult = {
    success: boolean;
    message: string;
    payload?: AppJwtPayload;
};

export async function signJwt(payload: AppJwtPayload): Promise<string> {
    // console.log("JWT_SECRET:", JWT_SECRET);
    const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .setJti(crypto.randomUUID())
    .sign(new TextEncoder().encode(JWT_SECRET))

    return token;
}

export async function verifyJwt(token: string): Promise<AppJwtPayload | null> {
    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        )
        return verified.payload as AppJwtPayload;
    } catch {
        return null;
    }
}

export async function verifyAccessFromRequest(req: NextRequest): Promise<VerifyAccessResult> {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        return { success: false, message: "Token missing" };
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return { success: false, message: "Malformed authorization header" };
    }
    const token = parts[1].trim();


    const payload = await verifyJwt(token);

    if (!payload) {
        return { success: false, message: "Invalid or expired token" };
    }

    return { success: true, message: "Authorized", payload };
}