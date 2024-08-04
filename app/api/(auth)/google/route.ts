import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { email, fullName, imageUrl } = await request.json();
    if (!email || !fullName || !imageUrl) {
        return new NextResponse("Missing information", { status: 200 });
    }

    const password = Math.random().toString(36).slice(-8);
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!existingUser) {
            const user = await prisma.user.create({
                data: {
                    email, fullName, imageUrl, password: hashedPassword
                }
            })

            const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '12h' });
            const userJSON = JSON.stringify(user);
            const response = new NextResponse(userJSON, { status: 201 });
            response.headers.set('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=${12 * 60 * 60}`);
            return response;
        }

        const token = jwt.sign({ userId: existingUser.id }, 'your_secret_key', { expiresIn: '12h' });

        const userJSON = JSON.stringify(existingUser);
        const response = new NextResponse(userJSON, { status: 201 });
        response.headers.set('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; Max-Age=${12 * 60 * 60}`);
        return response;
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}