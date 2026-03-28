import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PIXEL_ID = '1456584459292753';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { event, customer, payment } = req.body;

  if (event === 'purchase_approved' && customer?.email) {
    const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');

    try {
      const { error } = await supabase.from('purchase_access').insert({
        email: customer.email,
        payment_status: 'paid',
        purchased_at: new Date().toISOString()
      });

      if (error) throw error;

      const purchaseValue = payment?.amount || 19.90;
      const currency = payment?.currency || 'BRL';

      const pixelCode = `
        <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'Purchase', {
          value: ${purchaseValue},
          currency: '${currency}',
          content_name: 'Gravidez Organizada',
          content_type: 'product',
        });
        </script>
        <meta http-equiv="refresh" content="0;url=https://gravidezorganizada.online/cadastro?email=${customer.email}&token=${payment?.id || ''}">
      `;

      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(pixelCode);
    } catch (error) {
      console.error('Webhook processing error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (event === 'checkout_started' || event === 'add_payment_info') {
    const pixelCode = `
      <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${PIXEL_ID}');
      fbq('track', '${event === 'checkout_started' ? 'InitiateCheckout' : 'AddPaymentInfo'}', {
        value: 19.90,
        currency: 'BRL',
        content_name: 'Gravidez Organizada',
        content_type: 'product',
      });
      </script>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(pixelCode);
  }

  return res.status(200).json({ message: 'Event ignored' });
}
