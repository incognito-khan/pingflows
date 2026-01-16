import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { FollowUpStatus } from "@/src/lib/generated/prisma/enums";

export async function POST(req: Request) {
  try {
    const { leadId, action, comment, nextFollowUpAt } = await req.json();
    const userId = req.headers.get("x-user-id");

    if (!leadId || !action) {
      return NextResponse.json(
        { message: "Invalid payload", success: false },
        { status: 400 }
      );
    }

    if (!Object.values(FollowUpStatus).includes(action)) {
      return NextResponse.json(
        { message: "Invalid action", success: false },
        { status: 400 }
      );
    }

    // 🔒 Auth check
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { workspace: { select: { ownerId: true } } },
    });

    if (!lead || lead.workspace.ownerId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized from", success: false },
        { status: 401 }
      );
    }

    if (lead.status === "CLOSE") {
      return NextResponse.json(
        { message: "Lead already closed", success: false },
        { status: 400 }
      );
    }

    // ❗ Enforce Snooze rules
    if (action === "SNOOZED") {
      if (!nextFollowUpAt) {
        return NextResponse.json(
          { message: "nextFollowUpAt is required for snooze", success: false },
          { status: 400 }
        );
      }

      const parsedDate = new Date(nextFollowUpAt);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json(
          { message: "Invalid follow-up date", success: false },
          { status: 400 }
        );
      }
    }

    const [log, updatedLead] = await prisma.$transaction([
      // 1️⃣ Log the action
      prisma.followUpLogs.create({
        data: {
          leadId,
          action,
          comment,
        },
      }),

      // 2️⃣ Update lead state
      prisma.lead.update({
        where: { id: leadId },
        data: {
          status:
            action === "CLOSED"
              ? "CLOSE"
              : action === "SNOOZED"
              ? "WAITING"
              : "OPEN",

          lastContactedAt: action === "CONTACTED" ? new Date() : undefined,

          nextFollowUpAt:
            action === "SNOOZED"
              ? new Date(nextFollowUpAt)
              : action === "CLOSED"
              ? null
              : undefined,
        },
        include: {
          followupLogs: {
            orderBy: { createdAt: "desc" },
          },
        },
      }),
    ]);

    return NextResponse.json({ success: true, status: 200, data: updatedLead });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
