import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { FollowUpStatus } from "@/src/lib/generated/prisma/enums";

export async function POST(req: Request) {
    try {
        const { leadId, action } = await req.json();
        const userId = req.headers.get("x-user-id");

        if (!leadId || !action) {
            return NextResponse.json({ message: "Fields Invalid", success: false, status: 400 });
        }

        if (!Object.values(FollowUpStatus).includes(action)) {
            return NextResponse.json({
                message: "Invalid action",
                success: false,
                status: 400,
            });
        }

        const lead = await prisma.lead.findUnique({
            where: {
                id: leadId
            },
            include: {
                workspace: {
                    select: {
                        id: true,
                        name: true,
                        ownerId: true
                    }

                }
            }
        });

        const isLeadAuthentic = userId === lead?.workspace.ownerId;

        if (!isLeadAuthentic) {
            return NextResponse.json({ message: "Not Authorized", status: 401, success: false })
        }


        const log = await prisma.followUpLogs.create({
            data: {
                leadId,
                action
            }
        });

        return NextResponse.json({ message: "FollowUp marked successfully", success: true, status: 201, data: log })

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Internal Server Error",
            status: 500,
        });
    }
}