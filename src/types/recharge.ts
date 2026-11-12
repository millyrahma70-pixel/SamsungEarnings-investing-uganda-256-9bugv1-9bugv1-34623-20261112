import type { Recharge } from '@/types';

export interface StartRechargePaymentInput {
  amount: number;
  network: Recharge['network'];
  senderPhone: string;
  senderName: string;
  userId: string;
  userName: string;
  userPhone: string;
}

export interface StartRechargePaymentResult {
  reference: string;
  paymentUrl: null;
}
