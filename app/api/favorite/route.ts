import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const newUrl = new URL(req.url);
    const fileId = newUrl.searchParams.get('fileId');

    try {
        if (!fileId) return NextResponse.json("Missing fileId", { status: 200 });
        const file = await prisma.file.update({
            where: {
                id: fileId
            },
            data: {
                isFavorite: true
            }
        });
        return NextResponse.json(file, { status: 200 });
    } catch (error) {
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const { fileId } = await req.json();

    try {
        if (!fileId) return NextResponse.json("Missing fileId", { status: 200 });
        const file = await prisma.file.update({
            where: {
                id: fileId
            },
            data: {
                isFavorite: false
            }
        });
        return NextResponse.json(file, { status: 200 });
    } catch (error) {
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}