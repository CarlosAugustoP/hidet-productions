import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {slideId} = req.query;
    const {method} = req;

    if (method === 'POST') {
        try{
            if (req.body.password !== process.env.API_KEY) {
                res.status(401).json({error: 'Invalid key'});
                return;
            }

            const postId = req.body.postId;
            const validPostId = postId as string;

            if (!validPostId) {
                res.status(400).json({ error: 'Post ID is required' });
                return;
            }

            const updatedSlide = await db.slide.update({
                where: {
                    id: parseInt(slideId as string, 10)
                },
                data: {
                    posts:{
                        // Used to create or update a relationship between two models without creating a new instance in the db
                        connect: {id:validPostId}
                    }
                }
            })
            res.status(200).json(updatedSlide)

        }catch (error) {
            res.status(500).json({error: 'Internal Server Error'});
        }

    }else {
        console.error(`Bad request error. Expected POST but got ${method}`)
        res.status(400).json
    }
}