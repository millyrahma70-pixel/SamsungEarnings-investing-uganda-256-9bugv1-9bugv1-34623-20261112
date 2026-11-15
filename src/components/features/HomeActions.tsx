import { Link } from 'react-router-dom';
import { ShoppingBag, FileText, CalendarCheck, Gift, ShieldCheck, HelpCircle, ChevronRight } from 'lucide-react';
import { DAILY_CHECKIN_REWARD, TELEGRAM_OFFICIAL } from '@/constants/packages';
import { formatUGX, isToday } from '@/lib/utils';
import type { User } from '@/types';

interface HomeActionsProps { user: User }
const ACTIONS = [
  { label: 'Browse packages', path: '/product', Icon: ShoppingBag },
  { label: 'Transaction records', path: '/records', Icon: FileText },
  { label: 'Mission center', path: '/mission', Icon: Gift },
  { label: 'Platform rules', path: '/regulation', Icon: ShieldCheck },
];

export default function HomeActions({ user }: HomeActionsProps) {
  const checkedIn = Boolean(user.lastCheckIn && isToday(user.lastCheckIn));
  return (
    <section aria-labelledby="actions-heading" className="rounded-3xl border border-border bg-card p-5">
      <h2 id="actions-heading" className="mb-4 text-lg font-semibold">Manage your account</h2>
      <Link to="/mine" className="home-control mb-4 flex min-h-16 items-center gap-3 rounded-2xl bg-secondary p-4">
        <CalendarCheck className="shrink-0 text-primary" size={24} />
        <div className="flex-1"><span className="block font-semibold">Daily check-in</span><span className="text-sm text-secondary-foreground">{checkedIn ? 'Completed today' : `Claim ${formatUGX(DAILY_CHECKIN_REWARD)} on your account page`}</span></div>
        <ChevronRight size={20} />
      </Link>
      <nav aria-label="Account shortcuts" className="grid grid-cols-2 gap-3">
        {ACTIONS.map(({ label, path, Icon }) => <Link key={path} to={path} className="home-control flex min-h-24 flex-col items-start justify-center gap-3 rounded-2xl border border-border p-4"><Icon size={22} className="text-primary" /><span className="text-base font-medium">{label}</span></Link>)}
      </nav>
      <a href={TELEGRAM_OFFICIAL} target="_blank" rel="noopener noreferrer" className="home-control mt-4 flex min-h-12 items-center gap-3 rounded-xl p-3 font-medium text-primary"><HelpCircle size={20} /> Contact support <ChevronRight size={18} className="ml-auto" /></a>
    </section>
  );
}
