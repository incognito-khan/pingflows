import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function PATCH(req: Request) {
    try {
        const { nextFollowUpAt, leadId } = await req.json();
        const userId = req.headers.get("x-user-id");

        if (!nextFollowUpAt || !leadId) {
            return NextResponse.json({ message: "Invalid Fields", status: 400, success: false });
        }

        const date = new Date(nextFollowUpAt);
        if (isNaN(date.getTime())) {
            return new Response(
                JSON.stringify({ success: false, message: "Invalid date format" }),
                { status: 400 }
            );
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

        const updatedLead = await prisma.lead.update({
            where: {
                id: leadId
            },
            data: {
                nextFollowUpAt
            }
        })

        return NextResponse.json({ message: "Next Follow Up sets successfully", updatedLead, success: true, status: 200 })


    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", status: 500, success: false });
    }
}