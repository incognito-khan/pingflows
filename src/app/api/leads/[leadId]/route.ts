import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
    const lead = await prisma.lead.findUnique({
      where: {
        id: leadId,
      },
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
        notes: true,
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
    if (!lead) {
      return NextResponse.json({
        error: "Lead not found",
        success: false,
        status: 404,
      });
    }
    return NextResponse.json({
      message: "Lead fetched successfully",
      data: lead,
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}
