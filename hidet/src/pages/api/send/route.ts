  import { Resend } from 'resend';
  import { NextApiRequest, NextApiResponse } from 'next';

  const resend = new Resend(process.env.RESEND_API_KEY as string);
  console.log('resend', resend);

  export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { subject, text, contact} = req.body;

      try {
        const data = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: ['capv2004@gmail.com'],
          subject,
          text: `${text}\n\nContato do usuário: ${contact}`,
        });

        console.log('Email sent:', data);

        return res.status(200).json({ message: 'Email sent successfully', data });
      } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
