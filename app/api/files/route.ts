import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const newUrl = new URL(req.url);
    const userId = newUrl.searchParams.get('userId');
    try {
        if (!userId) return NextResponse.json("Missing userId", { status: 200 });
        const files = await prisma.file.findMany({
            where: {
                userId: userId
            },
            include: {
                user: true
            }

        });
        if (!files) return NextResponse.json("No files found", { status: 200 });
        return NextResponse.json(files, { status: 200 });
    } catch (error) {
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}