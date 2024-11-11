import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, redirectTo } = req.body;

    console.log('Request body:', req.body);

    if (!email || !redirectTo) {
      console.log('Missing email or redirectTo');
      return res.status(400).json({ error: 'Missing email or redirectTo' });
    }

    const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
    });

    if (error) {
      console.log('Error sending invite:', error.message);
      return res.status(400).json({ error: error.message });
    }

    console.log('Invite sent successfully');
    return res.status(200).json({ message: 'Invite sent successfully.' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}