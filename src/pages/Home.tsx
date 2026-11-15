import { Navigate } from 'react-router-dom';
import { AlertTriangle, Lock } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import HomeOverview from '@/components/features/HomeOverview';
import HomeActions from '@/components/features/HomeActions';
import HomeReferral from '@/components/features/HomeReferral';
import HomeNotifications from '@/components/features/HomeNotifications';
import HomePackages from '@/components/features/HomePackages';
import { useHomeDashboard } from '@/hooks/useHomeDashboard';
import '@/pages/Home.css';

export default function Home() {
  const { session, dashboard, markRead } = useHomeDashboard();
  if (!session) return <Navigate to="/login" replace />;
  const user = dashboard.data?.user;
  const products = dashboard.data?.products ?? [];
  const notifications = dashboard.data?.notifications ?? [];
  return (
    <div className="home-dashboard-layout">
      <AppLayout>
        <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
          <header className="mb-6 flex items-center justify-between gap-4">
            <div><p className="mb-1 text-sm font-medium text-primary">Huawei Earnings</p><h1 className="text-2xl font-bold">Hello, {user?.name || session.name}</h1><p className="mt-2 text-base text-secondary-foreground">Your balance, packages and account updates.</p></div>
            <HomeNotifications notifications={notifications} pending={markRead.isPending} onRead={(id) => markRead.mutate(id)} />
          </header>
          {dashboard.isPending && <p role="status" className="rounded-2xl border border-border bg-card p-6">Loading your account…</p>}
          {dashboard.isError && <div role="alert" className="mb-4 rounded-2xl border border-destructive bg-card p-4"><p className="flex items-start gap-2 font-medium"><AlertTriangle size={20} className="shrink-0 text-destructive" />Unable to refresh your account. Please retry.</p><button type="button" disabled={dashboard.isFetching} onClick={() => void dashboard.refetch()} className="home-control mt-3 min-h-11 rounded-xl border border-border px-4 font-semibold text-primary disabled:opacity-60">{dashboard.isFetching ? 'Retrying…' : 'Retry'}</button></div>}
          {user && <>
            {user.frozen && <section role="alert" className="mb-5 rounded-2xl border border-destructive bg-card p-4"><h2 className="flex items-center gap-2 font-semibold text-destructive"><Lock size={20} />Account frozen</h2><p className="mt-2 leading-relaxed text-secondary-foreground">Purchases and withdrawals are disabled. Contact support using the link below for help.</p></section>}
            <div className="grid items-start gap-5 lg:grid-cols-2">
              <div className="space-y-5"><HomeOverview user={user} activeCount={products.filter((product) => product.status === 'active').length} /><HomePackages products={products} /></div>
              <div className="space-y-5"><HomeActions user={user} /><HomeReferral code={user.referralCode} /></div>
            </div>
          </>}
        </main>
      </AppLayout>
    </div>
  );
}
