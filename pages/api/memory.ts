import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, date, memory, share, recaptchaToken, files } = req.body;

  // Verify reCAPTCHA
  const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
  });
  const recaptchaData = await recaptchaRes.json();
  if (!recaptchaData.success) return res.status(400).json({ error: 'reCAPTCHA failed' });

  // Save to Vercel Postgres, files as JSON string
  await sql`INSERT INTO memories (name, date, memory, share, files) VALUES (${name}, ${date}, ${memory}, ${share}, ${JSON.stringify(files)})`;

  res.status(200).json({ success: true });
}
