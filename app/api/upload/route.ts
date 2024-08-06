import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId, title, fileUrl, type } = await req.json();

    if (!userId || !title || !fileUrl || !type) {
        return new NextResponse("Missing information", { status: 200 });
    }

    try {
        const file = await prisma.file.create({
            data: {
                userId,
                title,
                fileUrl,
                type
            }
        })

        if (file) {
            return new NextResponse(JSON.stringify(file), { status: 201 });
        }

        return new NextResponse("Something went wrong", { status: 200 });

    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }

}