import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request) {
  try {
    const userId = req.headers.get("x-user-id");

    const now = new Date();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const leads = await prisma.lead.findMany({
      where: {
        workspace: {
          ownerId: userId!,
        },
        status: {
          not: "CLOSE",
        },
        nextFollowUpAt: {
          not: null,
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

    const dueToday = [];
    const overdue = [];
    const upcoming = [];

    for (const lead of leads) {
      if (!lead.nextFollowUpAt) continue;

      if (
        lead.nextFollowUpAt >= startOfToday &&
        lead.nextFollowUpAt <= endOfToday
      ) {
        dueToday.push(lead);
      } else if (lead.nextFollowUpAt < now) {
        overdue.push(lead);
      } else {
        upcoming.push(lead);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        dueToday,
        overdue,
        upcoming,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
