
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {

    try {
        const { token } = await req.json();
        if (!token) {
            return new NextResponse(JSON.stringify({ success: false }));
        }

        const isValid = jwt.verify(token.value, 'your_secret_key');
        if (!isValid) {
            return new NextResponse(JSON.stringify({ success: false }));
        }
        return new NextResponse(JSON.stringify({ success: true }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false }));
    }
}