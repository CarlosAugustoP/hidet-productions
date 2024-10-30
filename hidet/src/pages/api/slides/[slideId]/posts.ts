import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slideId } = req.query;
    const { method } = req;

    if (method === 'POST') {
        try {
            if (req.body.password !== process.env.API_KEY) {
                res.status(401).json({ error: 'Invalid key' });
                return;
            }

            const postId = req.body.postId;
            const validPostId = postId as string;

            if (!validPostId) {
                res.status(400).json({ error: 'Post ID is required' });
                return;
            }

            const slide : any = await db.slide.findUnique({
                where: {
                    id: parseInt(slideId as string, 10)
                },
                include: {
                    posts: true, 
                },
            });

            if (slide.posts.length >= 5) {
                return res.status(400).json({ error: 'This slide already has the maximum of 5 images' });
            }

            const updatedSlide = await db.slide.update({
                where: {
                    id: parseInt(slideId as string, 10)
                },
                data: {
                    posts: {
                        connect: { id: validPostId }
                    }
                }
            });

            res.status(200).json(updatedSlide);

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    } else if (method === 'GET') {
        try {
            const slide = await db.slide.findUnique({
                where: {
                    id: parseInt(slideId as string, 10)
                },
                include: {
                    posts: true, 
                },
            });

            if (!slide) {
                return res.status(404).json({ error: 'Slide not found' });
            }

            res.status(200).json(slide.posts);

        } catch (error) {
            console.error('Error fetching slide:', error);
            res.status(500).json({ error: 'Error fetching slide' });
        }

    } else {
        console.error(`Bad request error. Expected POST but got ${method}`);
        res.status(400).json({ error: 'Bad request' });
    }
}
