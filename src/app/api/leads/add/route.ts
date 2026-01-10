import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
    try {
        const { name, email, phone, workspaceId } = await req.json();

        if (!name || !email || !phone || !workspaceId) {
            return NextResponse.json({ message: "Please enter valid fields", status: 400, success: false })
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                phone,
                workspaceId
            }
        });

        return NextResponse.json({ message: "Lead Created Successfully", status: 201, success: true, data: lead })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", status: 500, success: false })
    }

}