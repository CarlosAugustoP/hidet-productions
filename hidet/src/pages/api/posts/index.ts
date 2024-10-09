import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const posts = await db.post.findMany();
                res.status(200).json(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                res.status(500).json({ error: 'Error fetching posts' });
            }
            break;

        case 'POST':
            try {
                const newPost = await db.post.create({
                    data: {
                        title: req.body.title,
                        img: req.body.img,
                        description: req.body.description || null,
                    },
                });
                res.status(201).json(newPost);
            } catch (error) {
                console.error('Error creating post:', error);
                res.status(500).json({ error: 'Error creating post' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
