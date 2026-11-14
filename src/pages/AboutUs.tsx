import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Info, MessageCircle } from 'lucide-react';
import { PACKAGES, MIN_DEPOSIT, MIN_WITHDRAWAL, TELEGRAM_OFFICIAL } from '@/constants/packages';
import { formatUGX } from '@/lib/utils';

const AboutUs = () => {
  const linkStyle = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const details = [
    { label: 'Available packages', value: `${PACKAGES.length} plans` },
    { label: 'Minimum recharge', value: formatUGX(MIN_DEPOSIT) },
    { label: 'Minimum withdrawal', value: formatUGX(MIN_WITHDRAWAL) },
    { label: 'Supported wallets', value: 'MTN Mobile Money and Airtel Money' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-8">
          <Link to="/mine" aria-label="Back to Mine" className={`${linkStyle} bg-primary-foreground/10`}><ArrowLeft className="h-5 w-5" /></Link>
          <h1 className="text-2xl font-bold">About Us</h1>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
        <section className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <p className="mb-2 font-semibold text-primary">Samsung Earnings</p>
          <h2 className="text-2xl font-bold">Your account, packages, and transaction records</h2>
          <p className="mt-4 max-w-3xl leading-relaxed">Manage your balance in Ugandan shillings, view available packages, track your purchases, and review recharge and withdrawal requests from your account.</p>
        </section>
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-2xl border bg-card p-6 shadow-sm" aria-labelledby="account-details">
            <h2 id="account-details" className="text-xl font-semibold">Platform at a glance</h2>
            <dl className="mt-4 divide-y divide-border">
              {details.map(({ label, value }) => (
                <div key={label} className="flex flex-wrap justify-between gap-2 py-4">
                  <dt>{label}</dt><dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <Link to="/product" className={`${linkStyle} mt-4 bg-primary text-primary-foreground`}>View packages <ArrowRight className="h-5 w-5" /></Link>
          </section>
          <aside className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Before you begin</h2>
            <p className="mt-4 leading-relaxed">Read package durations, recharge requirements, and withdrawal fees before committing funds.</p>
            <Link to="/regulation" className={`${linkStyle} mt-4 border text-primary`}>Read platform rules</Link>
            <h3 className="mt-6 text-lg font-semibold">Need help?</h3>
            <a href={TELEGRAM_OFFICIAL} target="_blank" rel="noopener noreferrer" className={`${linkStyle} mt-3 border text-primary`}><MessageCircle className="h-5 w-5" /> Telegram support</a>
          </aside>
        </div>
        <p className="mt-6 flex items-start gap-3 rounded-xl border bg-secondary p-4 leading-relaxed text-secondary-foreground"><Info className="mt-1 h-5 w-5 shrink-0" />Investment returns are not guaranteed. Review the risks and invest only what you can afford to lose.</p>
      </main>
    </div>
  );
};

export default AboutUs;
