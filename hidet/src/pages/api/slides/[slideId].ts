import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/prisma";
import { parse } from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const { slideId } = req.query as { slideId: string };
                const slide = await db.slide.findUnique({
                    where: {
                        id: parseInt(slideId as string, 10)
                    },
                });

                if (!slide) {
                    return res.status(404).json({ error: 'Slide not found' });
                }

                res.status(200).json(slide);
            } catch (error) {
                console.error('Error fetching slide:', error);
                res.status(500).json({ error: 'Error fetching slide' });
            }
            break;
        case 'PUT':
            try {
                const { slideId } = req.query;
                const { title, order: newOrder, password } = req.body;

                if (password !== process.env.API_KEY) {
                    return res.status(403).json({ error: 'Chave de segurança inválida.' });
                }

                const slideIdInt = parseInt(slideId as string, 10);

                await db.$transaction(async (transaction) => {
                    // Retrieve the slide being updated
                    const slideToUpdate = await transaction.slide.findUnique({
                        where: { id: slideIdInt },
                    });

                    if (!slideToUpdate) {
                        return res.status(404).json({ error: 'Slide not found' });
                    }

                    const originalOrder = slideToUpdate.order;

                    // Check if another slide has the new order
                    const conflictingSlide = await transaction.slide.findUnique({
                        where: { order: newOrder },
                    });

                    if (conflictingSlide && conflictingSlide.id !== slideIdInt) {
                        // put order of the original slide to 9999999
                        const updatedSlide = await transaction.slide.update({
                            where: { id: slideIdInt },
                            data: {
                                title,
                                order: 9999,
                            },
                        });
                        // Swap the order of the conflicting slide
                        await transaction.slide.update({
                            where: { id: conflictingSlide.id },
                            data: { order: originalOrder },
                        });
                    }

                    // Update the original slide with the new order and title
                    const updatedSlide = await transaction.slide.update({
                        where: { id: slideIdInt },
                        data: {
                            title,
                            order: newOrder,
                        },
                    });

                    res.status(200).json(updatedSlide);
                });
            } catch (error) {
                console.error('Error updating slide:', error);
                res.status(500).json({ error: 'Error updating slide' });
            }
            break;
        case 'DELETE':
            try {
                // TODO: Implementar a deleção de posts relacionados ao slide
                const { slideId } = req.query;
                const { password } = req.body;

                if (password !== process.env.API_KEY) {
                    return res.status(403).json({ error: 'Chave de segurança inválida.' });
                }

                await db.slide.delete({
                    where: {
                        id: parseInt(slideId as string, 10)
                    }
                });

                res.status(204).end();
            } catch (error) {
                console.error('Error deleting slide:', error);
                res.status(500).json({ error: 'Error deleting slide' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
