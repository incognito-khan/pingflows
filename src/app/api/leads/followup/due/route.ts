import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request) {
  try {
    const now = new Date(); // current time UTC

    const futureLeads = await prisma.lead.findMany({
      where: {
        nextFollowUpAt: {
          gte: now, // all leads scheduled in the future
        },
      },
      orderBy: {
        nextFollowUpAt: "asc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        nextFollowUpAt: true,
        lastContactedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Future follow-ups fetched",
      data: futureLeads,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
      status: 500,
    });
  }
}