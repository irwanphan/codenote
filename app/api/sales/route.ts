import prisma from '@libs/connections/prisma'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
    try {
        const json = await req.json();
    
        // console.log(json)

        const { productId, qty, userId, userEmail } = json

        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail }
        })

        if (existingUser) {
            const sale = await prisma.sales.create({
                include: {
                    detail: true
                },
                data: {
                    user: {
                        connect: {
                            id: existingUser.id
                        }
                    },
                    userEmail,
                    // total,
                    // note,
                    // shipments: {
                    //     create: {
                    //         address,
                    //         city,
                    //         province,
                    //         postal
                    //     }
                    // },
                    detail: {
                        create: {
                            productId: productId,
                            qty: parseInt(qty)
                        },
                    },
                    createdAt: ((new Date()).toISOString()).toLocaleString()
                }
            })
        }
    
        let json_response = {
          status: "success",
          data: {
            json
          }
        }
        return new NextResponse(JSON.stringify(json_response), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        })
    } catch (error: any) {
        console.log(error)
    }
}