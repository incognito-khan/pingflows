import { NextRequest, NextResponse } from "next/server";
import { verifyAccessFromRequest } from "@/src/lib/token";

const protectedRoutes = [
  "/api/leads",
  "/api/leads/",
  "/api/leads/**",
  "/api/v1/products",
  "/api/v1/products/",
  "/api/v1/products/**",
];

const authRoutes = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/v1/auth/forgot-password",
];

const publicRoutes = [
  "/accept-invitation", // frontend page
  "/accept-invitation/**", // allow /accept-invitation/:id
  "/api/v1/parents/**/accept-invitation", // allow API route with any :id
];

export async function middleware(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return NextResponse.next();
  }

  const path = req.nextUrl.pathname;

  // Allow public routes
  const isPublicRoute = publicRoutes.some(route =>
    route.includes("**")
      ? path.startsWith(route.replace("/**", ""))
      : path === route
  );

  if (isPublicRoute) return NextResponse.next();

  const isProtectedRoute = protectedRoutes.some(route =>
    route.endsWith("/**")
      ? path.startsWith(route.replace("/**", ""))
      : path === route
  );

  if (!isProtectedRoute) return NextResponse.next();

  const { success, message, payload } = await verifyAccessFromRequest(req);

  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // 🔥 Attach user context ONCE
  const headers = new Headers(req.headers);
  headers.set("x-user-id", payload.sub);
  headers.set("x-user-email", payload.email);

  if (payload.workspaceId) {
    headers.set("x-workspace-id", payload.workspaceId);
  }

  return NextResponse.next({
    request: { headers },
  });
}

