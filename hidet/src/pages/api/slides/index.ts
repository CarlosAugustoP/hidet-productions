import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {body} = req;
    const {method} = req;

    switch (method) {
        case 'GET':
            try {
                const slides = await db.slide.findMany({
                    orderBy: {postedAt: 'desc'},
                });
                res.status(200).json(slides);
            } catch (error) {
                console.error('Error fetching slides:', error);
                res.status(500).json({error: 'Error fetching slides'});
            }
            break;
        case 'POST':
            try {
                if (body.password !== process.env.API_KEY) {
                    res.status(401).json({error: 'Invalid key'});
                    return;
                }

                const newSlide = await db.slide.create({
                    data: {
                        title: req.body.title,
                        img: req.body.img,
                        description: req.body.description || null,
                    },
                });
                res.status(201).json(newSlide);
            }
}