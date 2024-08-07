import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const newUrl = new URL(req.url);
    const userId = newUrl.searchParams.get('userId');
    try {
        if (!userId) return NextResponse.json("Missing userId", { status: 200 });
        const files = await prisma.file.findMany({
            where: {
                userId: userId,
                isDeleted: false
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


export async function DELETE(req: NextRequest) {
    const newUrl = new URL(req.url);
    const fileId = newUrl.searchParams.get('fileId');

    console.log(fileId)

    try {
        if (!fileId) return NextResponse.json("Missing fileId", { status: 200 });
        const file = await prisma.file.update({
            where: {
                id: fileId as string
            },
            data: {
                isDeleted: true
            }
        });
        return NextResponse.json(file, { status: 200 });
    } catch (error) {
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}