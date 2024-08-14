import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const newUrl = new URL(req.url);
    const fileId = newUrl.searchParams.get('fileId');

    console.log(fileId)

    try {
        if (!fileId) return NextResponse.json("Missing fileId", { status: 200 });
        await prisma.file.delete({
            where: {
                id: fileId as string
            }
        });
        return NextResponse.json("File deleted", { status: 200 });
    } catch (error) {
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}