import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/prisma";
import { parse } from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req;

    switch (method) {
        case 'GET':
            try {
                const {slideId} = req.query;
                const slide = await db.slide.findUnique({
                    where: {
                        id: parseInt(slideId as string, 10)
                    },
                });

                if(!slide) {
                    return res.status(404).json({error: 'Slide not found'});
                }

                res.status(200).json(slide);
            } catch (error) {
                console.error('Error fetching slide:', error);
                res.status(500).json({error: 'Error fetching slide'});
            }
            break;
        case 'PUT':
            try {
                const {slideId} = req.query;
                const {title} = req.body;

                const updatedSlide = await db.slide.update({
                    where: {
                        id: parseInt(slideId as string, 10)
                    },
                    data: {
                        title,
                    }
                });

                res.status(200).json(updatedSlide);
            } catch (error) {
                console.error('Error updating slide:', error);
                res.status(500).json({error: 'Error updating slide'});
            }
            break;
        case 'DELETE':
            try {
                const {slideId} = req.query;

                await db.slide.delete({
                    where: {
                        id: parseInt(slideId as string, 10)
                    }
                });

                res.status(204).end();
            } catch (error) {
                console.error('Error deleting slide:', error);
                res.status(500).json({error: 'Error deleting slide'});
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
}
