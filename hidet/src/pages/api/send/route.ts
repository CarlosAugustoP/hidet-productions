import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from "next";
import { LRUCache } from "lru-cache";

const resend = new Resend(process.env.RESEND_API_KEY as string);
console.log("resend", resend);

// Configure rate limiting
const rateLimit = new LRUCache<string, number>({
  max: 500, // Maximum number of unique IPs to track
  ttl: 60 * 60 * 1000, // Time-to-live for each entry (1 hour)
});

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ip = req.socket.remoteAddress;

  if (ip) {
    const currentCount = rateLimit.get(ip) || 0;

    if (currentCount >= 1) {
      return res.status(429).json({ error: "Too many requests, please try again later." });
    }

    rateLimit.set(ip, currentCount + 1);
  }

  if (req.method === "POST") {
    const { subject, text, contact } = req.body;

    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["vitormm2002@gmail.com"],
        subject,
        text: `${text}\n\nContato do usuário: ${contact}`,
      });

      console.log("Email sent:", data);

      return res.status(200).json({ message: "Email sent successfully", data });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
