import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request) {
  try {
    const leads = await prisma.lead.findMany({
      select: {
        id: true,
        workspaceId: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        lastContactedAt: true,
        nextFollowUpAt: true,
        createdAt: true,
        followupLogs: {
          select: {
            id: true,
            createdAt: true,
            comment: true,
            action: true,
          },
        },
      },
    });
    return NextResponse.json({
      message: "Leads fetched successfully",
      data: leads,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
