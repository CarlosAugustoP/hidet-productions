import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
import { create } from "domain";
import { UUID } from "crypto";

export default async function createPost(req: NextApiRequest, res: NextApiResponse) {

    const apiKey = req.headers['api-key'];

    if (req.method === 'POST') {
        try {
            const newPost = await prisma.post.create({
                data: {
                    title: req.body.title,
                    img: req.body.img,
                    description: req.body.description || null,
                }
            });
            res.status(200).json(newPost);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error creating post:', error.message); // Logar detalhes da mensagem do erro
                res.status(500).json({ error: 'Error creating post', details: error.message }); // Enviar a mensagem de erro no response
            } else {
                console.error('Unknown error:', error); // Se o erro não for do tipo Error, logue o erro bruto
                res.status(500).json({ error: 'Error creating post', details: 'Unknown error occurred' }); // Enviar resposta genérica
            }
        }
        
        
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
