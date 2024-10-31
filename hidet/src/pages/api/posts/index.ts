import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { body } = req;

    switch (method) {
        case 'GET':
            try {
                const posts = await db.post.findMany({
                    orderBy: { postedAt: 'desc' },
                });
                res.status(200).json(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                res.status(500).json({ error: 'Error fetching posts' });
            }
            break;

        case 'POST':
            try {
                if (body.password !== process.env.API_KEY) {
                    res.status(401).json({ error: 'Invalid key' });
                    return;
                }

                let maxOrder: any;

                const { title, img, description, video, isImg, order, slideId } = req.body;

                // Verifica se o slideId foi passado
                if (!slideId) {
                    res.status(400).json({ error: 'Slide ID is required' });
                    return;
                }

                // Obtém a próxima ordem disponível no slide, caso a ordem não seja passada
                let postOrder = order;
                if (!postOrder) {
                    maxOrder = await db.post.findFirst({
                        where: { slideId },
                        orderBy: { order: 'desc' },
                    });
                    postOrder = (maxOrder?.order ?? 0) + 1;
                } else {
                    // Verifica se já existe um post com a mesma ordem no slide
                    const conflictingPost = await db.post.findFirst({
                        where: {
                            slideId,
                            order: postOrder,
                        },
                    });

                    // Se houver conflito, atualiza a ordem do post existente
                    if (conflictingPost) {
                        await db.post.update({
                            where: { id: conflictingPost.id },
                            data: { order: (maxOrder?.order ?? 0) + 1 },
                        });
                    }
                }

                // Cria o novo post com a ordem ajustada
                const newPost = await db.post.create({
                    data: {
                        title,
                        img: img || null,
                        description: description || null,
                        video: video || null,
                        isImg: isImg !== undefined ? isImg : true,
                        order: postOrder,
                        slideId,
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
