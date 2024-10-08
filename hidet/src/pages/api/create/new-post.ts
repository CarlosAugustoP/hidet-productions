import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from '@prisma/client';
import { create } from "domain";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export default async function createPost(req: NextApiRequest, res: NextApiResponse) {

    const apiKey = req.headers['api-key'];

    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        try {
            console.log("Title:", req.body.title);
            console.log("Image URL:", req.body.img);
            console.log("Description:", req.body.description);
            const newPost = await prisma.post.create({
                data: {
                    title: req.body.title,
                    img: req.body.img,
                    description: req.body.description || null,
                }
            });
            res.status(200).json(newPost);
        } catch (error) {
            res.status(500).json({ error: 'Error creating post' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
