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
      // 1. Log the webhook event
      await supabase.from('payments_webhook_log').insert({
        provider: 'cakto',
        event_type: event,
        payload: req.body,
        processed: true
      });

      // 2. Upsert subscription/profile
      await supabase.from('subscriptions').upsert({
        email: customer.email,
        status: 'active',
        plan_name: 'Gravidez Organizada',
        payment_provider: 'cakto',
        provider_transaction_id: payment?.id
      }, { onConflict: 'email' });

      return res.status(200).json({ message: 'Purchase processed and recorded' });
    } catch (error) {
      console.error('Webhook processing error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(200).json({ message: 'Event ignored' });
}
