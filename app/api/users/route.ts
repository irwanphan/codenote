import prisma from '@libs/connections/prisma'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
    try {
        const json = await req.json();
        const { userId, userEmail, userName, userImage } = json

        // console.log(json)

        // const existingUser = 'test'
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail }
        })
        
        // console.log(existingUser)

        if (!existingUser) {
            const user = await prisma.user.create({
                data: {
                    code: userId,
                    email: userEmail,
                    name: userName,
                    image: userImage
                }
            })
            return new NextResponse(JSON.stringify(user), {
                status: 201,
                headers: { "Content-Type": "application/json" },
            })
            // console.log(user)
        }
        return new NextResponse(JSON.stringify(existingUser), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })

    } catch (e:any) {
        console.log(e)
    }
}