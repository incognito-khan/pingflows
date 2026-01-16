import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ workspaceId: string }> }
) {
  try {
    const { workspaceId } = await params;

    const now = new Date();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        ownerId: true,
        leads: {
          where: {
            nextFollowUpAt: {
              not: null,
            },
          },
          select: {
            id: true,
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
        },
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { message: "Workspace not found", success: false },
        { status: 404 }
      );
    }

    // 🔥 Server-side classification (correct place)
    const dueToday = [];
    const overdue = [];

    for (const lead of workspace.leads) {
      if (!lead.nextFollowUpAt) continue;

      if (
        lead.nextFollowUpAt >= startOfToday &&
        lead.nextFollowUpAt <= endOfToday
      ) {
        dueToday.push(lead);
      } else if (lead.nextFollowUpAt < now && lead.status !== "CLOSE") {
        overdue.push(lead);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        workspace,
        dueToday,
        overdue,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
