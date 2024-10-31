import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/prisma';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../firebase/firebase';

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

        case 'PUT': {
            const { title, img, description, password, order } = req.body;

            if (password !== process.env.API_KEY) {
                return res.status(403).json({ error: 'Chave de segurança inválida.' });
            }

            const dataToUpdate: any = {};
            if (title !== undefined) dataToUpdate.title = title;
            if (img !== undefined) dataToUpdate.img = img;
            if (description !== undefined) dataToUpdate.description = description;

            try {
                // Busca o post atual para pegar seu slideId e ordem
                const currentPost = await db.post.findUnique({ where: { id: String(id) } });

                // Verifica se uma nova ordem foi passada e se é diferente da ordem atual
                if (order !== undefined && currentPost && currentPost.order !== order) {
                    // Verifica se já existe um post com a nova ordem no mesmo slide
                    const conflictingPost = await db.post.findFirst({
                        where: {
                            slideId: currentPost.slideId,
                            order,
                        },
                    });

                    // Se houver conflito, troca as ordens
                    if (conflictingPost) {
                        await db.post.update({
                            where: { id: conflictingPost.id },
                            data: { order: currentPost.order },
                        });
                    }

                    // Define a nova ordem para o post atual
                    dataToUpdate.order = order;
                }

                // Atualiza o post com os dados ajustados
                const updatedPost = await db.post.update({
                    where: { id: String(id) },
                    data: dataToUpdate,
                });

                return res.status(200).json(updatedPost);
            } catch (error) {
                console.error('Error updating post:', error);
                return res.status(500).json({ error: 'Error updating post' });
            }
        }


        case 'DELETE':
            const password = JSON.parse(req.body).password;

            if (password !== process.env.API_KEY) {
                res.status(401).json({ error: 'Invalid key' });
                return;
            }

            const post = await db.post.findUnique({
                where: { id: String(id) },
            });

            if (!post) {
                res.status(404).json({ error: 'Post not found' });
                return;
            }

            if (post.img) { // Delete image from Firebase Storage
                const imageRef = ref(storage, post.img);
                await deleteObject(imageRef);
            }

            try { // Delete post from Prisma
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