import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@libs/connections/prisma'

export async function GET(req:NextApiRequest, res:NextApiResponse) {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                id: 'desc'
            }
        })
        // console.log(users)
        return res.status(200).json(users)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: `${e}` })
    }
}

export async function POST(req:NextApiRequest, res:NextApiResponse) {
    try {
        const { id, email, name, image } = req.body

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })
        console.log(existingUser)

        const code = id

        if (!existingUser) {
            const user = await prisma.user.create({
                data: {
                    code,
                    email,
                    name,
                    image
                }
            })
            // console.log(user)
            return res.status(200).json(user)
        }
        return res.status(200).json(existingUser)

    } catch (e:any) {
        console.log(e)
        return res.status(500).json({ message: `${e.status}` })
    }
}