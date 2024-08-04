import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth_token');
    if (!token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    try {
        const responce = await axios.post('http://localhost:3000/api/verify', { token }, { withCredentials: true });
        const { success } = responce.data;
        if (!success) {
            return NextResponse.redirect(new URL('/signin', request.url));
        }
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

}


export const config = {
    matcher: ['/dashboard/:path*'],
}