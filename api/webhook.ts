import { createClient } from '@supabase/supabase-js';

// These secrets should be configured in Vercel environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, customer, payment } = req.body;

  if (event === 'purchase_approved' && customer?.email) {
    const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');

    try {
      // 1. Generate a unique token for the purchase (simplified UUID)
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      // 2. Insert into purchase_access with 'paid' status
      const { error } = await supabase.from('purchase_access').insert({
        email: customer.email,
        payment_status: 'paid',
        token: token,
        used: false,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days expiry
      });

      if (error) throw error;

      return res.status(200).json({ message: 'Purchase processed and token generated' });
    } catch (error) {
      console.error('Webhook processing error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(200).json({ message: 'Event ignored' });
}
