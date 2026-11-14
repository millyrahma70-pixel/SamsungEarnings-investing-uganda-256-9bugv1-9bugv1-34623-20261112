import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const now = new Date();
  // Uganda date = UTC+3
  const ugandaNow = new Date(now.getTime() + 3*60*60*1000);
  const todayUganda = ugandaNow.toISOString().split('T')[0]; // 2026-05-13

  console.log(`[DAILY INCOME] Starting for Uganda date: ${todayUganda}`);

  const { data: products } = await supabase.from('user_products').select('*').eq('status', 'active');

  let credited = 0;
  let total = 0;

  for (const product of products || []) {
    // 1. Expired?
    if (product.expiry_date && new Date(product.expiry_date) < now) {
      await supabase.from('user_products').update({ status: 'expired' }).eq('id', product.id);
      continue;
    }

    const dailyIncome = Number(product.daily_income || 0);
    if (dailyIncome <= 0) continue;

    // 2. CHECK: Did this product already get paid TODAY? (Uganda date)
    // Look in transactions for today
    const { data: alreadyPaid } = await supabase
      .from('transactions')
      .select('id')
      .eq('user_id', product.user_id)
      .eq('type', 'income')
      .ilike('description', `%${product.id}%`)
      .gte('created_at', `${todayUganda}T00:00:00`)
      .lte('created_at', `${todayUganda}T23:59:59`);

    // Better check: by last_income_date Uganda day
    let lastPaidUganda = null;
    if (product.last_income_date) {
      const last = new Date(new Date(product.last_income_date).getTime() + 3*60*60*1000);
      lastPaidUganda = last.toISOString().split('T')[0];
    }

    if (lastPaidUganda === todayUganda) {
      console.log(`Already paid today ${product.id} for ${todayUganda}`);
      continue;
    }

    // 3. GET USER
    const { data: user } = await supabase.from('users').select('*').eq('id', product.user_id).single();
    if (!user) continue;

    // 4. PAY - MUST RECEIVE EVERYDAY
    console.log(`PAYING UGX ${dailyIncome} to ${user.phone} for product ${product.id}`);

    // Add to balance
    await supabase.from('users').update({
      balance: Number(user.balance) + dailyIncome,
      total_earnings: Number(user.total_earnings || 0) + dailyIncome,
      cumulative_income: Number(user.cumulative_income || 0) + dailyIncome
    }).eq('id', user.id);

    // Update product last income
    await supabase.from('user_products').update({
      last_income_date: now.toISOString(),
      total_income_earned: Number(product.total_income_earned || 0) + dailyIncome
    }).eq('id', product.id);

    // Transaction record with product id so we can check duplicate
    await supabase.from('transactions').insert([{
      user_id: user.id,
      type: 'income',
      amount: dailyIncome,
      description: `Daily income ${product.package_name || product.product_name} | ProductID:${product.id} | Date:${todayUganda}`
    }]);

    credited++;
    total += dailyIncome;
  }

  console.log(`DONE: ${credited} users paid, total UGX ${total} for ${todayUganda}`);

  return new Response(JSON.stringify({ 
    success: true, 
    date: todayUganda,
    credited, 
    total 
  }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}); 
