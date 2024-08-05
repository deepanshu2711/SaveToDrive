import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json("Logout successful", { status: 200 });
        response.cookies.delete('auth_token');
        return response;
    } catch (error) {
        return NextResponse.json("Logout failed", { status: 500 });
    }
}