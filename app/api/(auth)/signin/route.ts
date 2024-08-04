import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    console.log(email, password)
    if (!email || !password) {
        return new NextResponse("Missing information", { status: 200 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return new NextResponse("User not found", { status: 200 });
    }

    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

    if (!isPasswordCorrect) {
        return new NextResponse("Invalid credentials", { status: 200 });
    }

    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '12h' });

    const userJSON = JSON.stringify(user);
    const response = new NextResponse(userJSON, { status: 201 });
    response.headers.set('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=${12 * 60 * 60}`);
    return response;

}