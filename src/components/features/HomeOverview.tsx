import { Link } from 'react-router-dom';
import { ArrowDownToLine, ArrowUpRight, Wallet } from 'lucide-react';
import { formatUGX } from '@/lib/utils';
import type { User } from '@/types';

interface HomeOverviewProps { user: User; activeCount: number }

export default function HomeOverview({ user, activeCount }: HomeOverviewProps) {
  return (
    <section aria-labelledby="balance-heading" className="home-balance rounded-3xl p-6 text-primary-foreground">
      <div className="flex items-center justify-between gap-4">
        <h2 id="balance-heading" className="flex items-center gap-2 text-base font-medium"><Wallet size={20} /> Account balance</h2>
        <span className="rounded-full border border-primary-foreground/30 px-3 py-1 text-sm">UGX</span>
      </div>
      <p className="mt-4 break-words text-3xl font-bold tracking-tight">{formatUGX(user.balance)}</p>
      <p className="mt-2 text-base">{activeCount} active {activeCount === 1 ? 'package' : 'packages'}</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link to="/recharge" className="home-control flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-foreground px-3 py-3 font-semibold text-primary">Recharge <ArrowUpRight size={18} /></Link>
        {user.frozen ? <button disabled className="min-h-12 rounded-xl border border-primary-foreground/30 px-3 py-3 font-semibold opacity-60">Withdraw paused</button> : <Link to="/withdraw" className="home-control flex min-h-12 items-center justify-center gap-2 rounded-xl border border-primary-foreground/40 px-3 py-3 font-semibold"><ArrowDownToLine size={18} /> Withdraw</Link>}
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-primary-foreground/30 pt-5">
        {[['Total earnings', user.totalEarnings], ['Package earnings', user.dailyEarnings], ['Referral earnings', user.referralEarnings], ['Total withdrawn', user.totalWithdrawal]].map(([label, value]) => (
          <div key={label}><dt className="text-sm">{label}</dt><dd className="mt-1 break-words text-base font-semibold">{formatUGX(Number(value))}</dd></div>
        ))}
      </dl>
    </section>
  );
}
