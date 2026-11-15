import { Link } from 'react-router-dom';
import { Copy, Users, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

interface HomeReferralProps { code: string }

export default function HomeReferral({ code }: HomeReferralProps) {
  const copyCode = () => {
    if (!navigator.clipboard) {
      toast.error('Copy is unavailable in this browser. Select your code on the Team page.');
      return;
    }
    void navigator.clipboard.writeText(code).then(
      () => toast.success('Referral code copied.'),
      () => toast.error('Unable to copy. Select your code on the Team page.'),
    );
  };
  return (
    <section aria-labelledby="referral-heading" className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center gap-3"><Users size={24} className="text-primary" /><h2 id="referral-heading" className="text-lg font-semibold">Your referral team</h2></div>
      <p className="mt-3 leading-relaxed text-secondary-foreground">Share your code and track your team and referral earnings.</p>
      <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-secondary p-4">
        <span className="break-all text-xl font-bold tracking-widest">{code}</span>
        <button type="button" onClick={copyCode} aria-label="Copy referral code" className="home-control flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary"><Copy size={20} /></button>
      </div>
      <Link to="/team" className="home-control mt-3 flex min-h-11 items-center justify-between rounded-xl p-2 font-semibold text-primary">View team and invite link <ArrowUpRight size={20} /></Link>
    </section>
  );
}
