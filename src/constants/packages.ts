// ─── Package Definition ────────────────────────────────────────────────────────

export enum PackageGroup {
  Starter = 'Starter',
  Growth = 'Growth',
  Premium = 'Premium',
}

export interface Package {
  id: string;
  name: string;
  price: number;
  dailyIncome: number;
  duration: number; // days
  group: PackageGroup | 1 | 2 | 3;
  image: string;
}

// No package entries remain after the GitHub edit.
export const PACKAGES: Package[] = [];


// ─── Financial Constants ───────────────────────────────────────────────────────

/** 18% withdrawal tax */
export const WITHDRAWAL_TAX = 0.18;

/** Minimum withdrawal amount in UGX */
export const MIN_WITHDRAWAL = 10000;

/** Minimum recharge/deposit amount in UGX */
export const MIN_DEPOSIT = 15000;

/** Registration bonus in UGX */
export const REGISTRATION_BONUS = 7000;

/** Daily check-in reward in UGX */
export const DAILY_CHECKIN_REWARD = 200;

// ─── Mobile Money Numbers ──────────────────────────────────────────────────────

export const MTN_NUMBER = '0756406186';
export const MTN_NAME = 'Nabakooza Milly';

export const AIRTEL_NUMBER = '0756406186';
export const AIRTEL_NAME = 'Nabakooza Milly';

// ─── Social / Links ────────────────────────────────────────────────────────────

export const TELEGRAM_OFFICIAL = 'https://t.me/engleinvestment';
