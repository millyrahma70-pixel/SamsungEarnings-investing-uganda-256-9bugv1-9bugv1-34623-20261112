import { supabase } from '@/lib/supabase';
import { MIN_DEPOSIT } from '@/constants/packages';
import { formatUGX } from '@/lib/utils';
import type { StartRechargePaymentInput, StartRechargePaymentResult } from '@/types/recharge';

/** Queue the configured manual PesaJet prompt request; do not charge or credit money. */
export async function startRechargePayment(input: StartRechargePaymentInput): Promise<StartRechargePaymentResult> {
  const senderPhone = input.senderPhone.trim().replace(/[\s-]/g, '');
  const senderName = input.senderName.trim();
  if (!Number.isSafeInteger(input.amount) || input.amount < MIN_DEPOSIT) {
    throw new Error(`Minimum deposit is ${formatUGX(MIN_DEPOSIT)}. Enter a whole UGX amount.`);
  }
  if (input.network !== 'mtn' && input.network !== 'airtel') throw new Error('Choose MTN or Airtel.');
  if (!/^(?:0|\+?256)7\d{8}$/.test(senderPhone)) throw new Error('Enter a valid Ugandan mobile money number, such as 07XXXXXXXX.');
  if (!senderName) throw new Error('Enter the mobile money account name.');
  if (!input.userId) throw new Error('Please log in again.');

  const { data: user, error: userError } = await supabase.from('samsung_users')
    .select('id, name, phone, frozen').eq('id', input.userId).maybeSingle();
  if (userError) {
    console.error('Recharge account lookup failed:', userError.code);
    throw new Error('Unable to verify your account. Please try again.');
  }
  if (!user) throw new Error('Account not found. Please log in again.');
  if (user.frozen) throw new Error('Your account is frozen. Contact support.');

  const { data, error } = await supabase.from('samsung_recharges').insert({
    user_id: user.id,
    user_name: user.name,
    user_phone: user.phone,
    amount: input.amount,
    network: input.network,
    sender_phone: senderPhone,
    sender_name: senderName,
    proof: '',
    status: 'pending',
    processed_at: null,
  }).select('id').single();
  if (error || !data) {
    console.error('Recharge request save failed:', error?.code);
    throw new Error('Unable to save your recharge request. Please check your connection and try again.');
  }
  return { reference: data.id, paymentUrl: null };
}
