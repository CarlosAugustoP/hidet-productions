import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const post = await db.post.findUnique({
                    where: { id: String(id) },
                });
                res.status(200).json(post);
            } catch (error) {
                console.error('Error fetching post: ', error);
                res.status(500).json({ error: 'Error fetching post' });
            }
            break;

        case 'PUT':
            try {
                const updatedPost = await db.post.update({
                    where: { id: String(id) },
                    data: {
                        title: req.body.title,
                        img: req.body.img,
                        description: req.body.description || null,
                    }
                });
                res.status(200).json(updatedPost);
            } catch (error) {
                console.error('Error updating post:', error);
                res.status(500).json({ error: 'Error updating post' });
            }
            break;

        case 'DELETE':
            try {
                await db.post.delete({
                    where: { id: String(id) },
                });

                res.status(204).end();
            } catch (error) {
                console.error('Error deleting post:', error);
                res.status(500).json({ error: 'Error deleting post' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}