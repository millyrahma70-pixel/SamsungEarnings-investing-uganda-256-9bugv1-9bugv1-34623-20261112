import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { formatUGX } from '@/lib/utils';
import type { UserProduct } from '@/types';

interface HomePackagesProps { products: UserProduct[] }

export default function HomePackages({ products }: HomePackagesProps) {
  const active = products.filter((product) => product.status === 'active');
  const dailyIncome = active.reduce((total, product) => total + product.dailyIncome, 0);
  return (
    <section aria-labelledby="packages-heading" className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3"><h2 id="packages-heading" className="text-lg font-semibold">Your packages</h2><ShoppingBag size={22} className="text-primary" /></div>
      {active.length > 0 ? <><p className="mt-4 text-2xl font-bold text-primary">{formatUGX(dailyIncome)}<span className="ml-2 text-base font-normal text-secondary-foreground">/ day</span></p><p className="mt-2 leading-relaxed text-secondary-foreground">Scheduled income across {active.length} active {active.length === 1 ? 'package' : 'packages'}. View details for dates and credited earnings.</p></> : <p className="mt-4 leading-relaxed text-secondary-foreground">No active packages yet. Review the package catalog and platform rules before purchasing.</p>}
      {products.some((product) => product.status === 'pending') && <p className="mt-3 text-sm font-medium text-primary">You have packages awaiting approval.</p>}
      <Link to={products.length ? '/my-product' : '/product'} className="home-control mt-3 flex min-h-11 items-center justify-between rounded-xl p-2 font-semibold text-primary">{products.length ? 'View my packages' : 'View package catalog'}<ChevronRight size={20} /></Link>
    </section>
  );
}
