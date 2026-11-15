import { useState } from 'react';
import { Bell, X, CheckCheck } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import type { Notification } from '@/types';

interface HomeNotificationsProps {
  notifications: Notification[];
  onRead: (id: string) => void;
  pending: boolean;
}

export default function HomeNotifications({ notifications, onRead, pending }: HomeNotificationsProps) {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;
  return (
    <div className="relative">
      <button type="button" aria-label={`Notifications, ${unreadCount} unread`} aria-expanded={open} aria-controls="home-notifications" onClick={() => setOpen(!open)} className="home-control relative flex min-h-12 min-w-12 items-center justify-center rounded-2xl border border-border bg-card text-primary">
        <Bell size={22} />
        {unreadCount > 0 && <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-destructive px-1 text-center text-xs font-semibold text-destructive-foreground">{unreadCount > 99 ? '99+' : unreadCount}</span>}
      </button>
      {open && (
        <section id="home-notifications" aria-label="Notifications" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }} className="home-notifications absolute right-0 top-full z-40 mt-3 w-[min(360px,calc(100vw-48px))] overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b border-border px-4 py-2"><h2 className="text-lg font-semibold">Notifications</h2><button type="button" onClick={() => setOpen(false)} aria-label="Close notifications" className="home-control flex min-h-11 min-w-11 items-center justify-center rounded-xl"><X size={20} /></button></div>
          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.length === 0 ? <p className="p-6 leading-relaxed text-secondary-foreground">No notifications yet. Account updates will appear here.</p> : notifications.map((notification) => (
              <button key={notification.id} type="button" disabled={notification.isRead || pending} onClick={() => onRead(notification.id)} className={`home-control block w-full border-b border-border p-4 text-left disabled:cursor-default ${notification.isRead ? 'bg-card' : 'bg-secondary'}`}>
                <span className="flex items-start gap-2 font-semibold">{notification.title}{notification.isRead && <CheckCheck size={18} className="ml-auto shrink-0 text-primary" />}</span>
                <span className="mt-2 block text-base leading-relaxed text-secondary-foreground">{notification.message}</span>
                <time dateTime={notification.createdAt} className="mt-2 block text-sm text-secondary-foreground">{formatDateTime(notification.createdAt)}</time>
                {!notification.isRead && <span className="mt-2 block text-sm font-medium text-primary">{pending ? 'Updating…' : 'Tap to mark as read'}</span>}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
