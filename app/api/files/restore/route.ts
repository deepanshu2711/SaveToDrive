import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {

        const { fileId } = await req.json();
        if (!fileId) return NextResponse.json("Missing fileId", { status: 200 });
        await prisma.file.update({
            where: {
                id: fileId
            },
            data: {
                isDeleted: false,
                isFavorite: false
            }
        });
        return NextResponse.json("File restored", { status: 200 });
        
    } catch (error) {
        return NextResponse.json("Something went wrong", { status: 500 });
    }
} 