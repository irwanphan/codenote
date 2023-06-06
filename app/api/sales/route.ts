// api for nextjs to submit sales data to database
// the submit form is in app\sales\index.tsx
// the api is called in app\sales\index.tsx
// the form has two input fields: name and qty
// the api will insert the data into the database in supabase using prisma
// the api will return the data to the client
// the client will display the data in the table

import { NextApiRequest, NextApiResponse } from "next"
// import { PrismaClient } from "@prisma/client"
import prisma from '@libs/connections/prisma'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
    try {
        const json = await req.json();
    
        // const feedback = await prisma.feedback.create({
        //   data: json,
        // });
        console.log(json)

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
                    userId,
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

    // try {
    //     const { address, city, province, postal, total, note, user, orders } = req.body
    //     console.log('request body', req.body)
    //     // console.log(note)
    //     // console.log(user)s
    //     const existingUser = await prisma.user.findUnique({
    //         where: { email: user.email }
    //     })
    //     // console.log(existingUser)
    //     const userId = existingUser?.id
    //     const userEmail:any = user.email
    //     console.log(userId)
    //     console.log(userEmail)
    //     // NOTE: check orders
    //     // orders.map((order:any) => {
    //     //     console.log(order.id)
    //     // })
            
    //     if (existingUser) {
    //         const purchase = await prisma.sales.create({
    //             include: {
    //                 detail: true
    //             },
    //             data: {
    //                 user: {
    //                     connect: {
    //                         id: existingUser.id
    //                     }
    //                 },
    //                 userEmail,
    //                 total,
    //                 note,
    //                 // shipments: {
    //                 //     create: {
    //                 //         address,
    //                 //         city,
    //                 //         province,
    //                 //         postal
    //                 //     }
    //                 // },
    //                 detail: {
    //                     create: orders.map((order:any) => ({
    //                             productId: order.id,
    //                             purchasePrice: order.price,
    //                             qty: order.quantity,
    //                             unit: 'piece'
    //                     })),
    //                 }
    //                 // createdAt: ((new Date()).toISOString()).toLocaleString()
    //             }
    //         })
    //         console.log(purchase)
    //         return res.status(200).json(purchase)
    //     }

    // } catch (e:any) {
    //     console.log(e)
    //     return res.status(500).json({ message: `${e.status}` })
    // }
}