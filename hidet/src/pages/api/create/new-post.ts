import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from '@prisma/client'
import { create } from "domain";
import { UUID } from "crypto";

const prisma = new PrismaClient();

export default async function createPost(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST'){
        try {
            const newPost = await prisma.post.create({
                data: {
                    title: req.body.title,
                    img: req.body.img,
                    description: req.body.description,
                }

            });
            res.status(200).json(newPost);
 
        } catch (error){
            res.status(500).json({error: 'Error creating post'});
        }
        }else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
}
}