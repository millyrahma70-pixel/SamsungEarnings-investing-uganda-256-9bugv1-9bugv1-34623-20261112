import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getCurrentUser, getUserById, getUserProducts, getUserNotifications, markNotificationRead, setCurrentUser } from '@/lib/storage';

export function useHomeDashboard() {
  const [session] = useState(getCurrentUser);
  const queryClient = useQueryClient();
  const dashboard = useQuery({
    queryKey: ['home-dashboard', session?.id],
    enabled: Boolean(session),
    queryFn: async () => {
      if (!session) throw new Error('Please sign in to view your account.');
      const [user, products, notifications] = await Promise.all([
        getUserById(session.id), getUserProducts(session.id), getUserNotifications(session.id),
      ]);
      if (!user) throw new Error('Unable to load your account. Please retry.');
      return { user, products, notifications };
    },
    refetchInterval: 30000,
    retry: 1,
  });
  useEffect(() => {
    if (dashboard.data?.user) setCurrentUser(dashboard.data.user);
  }, [dashboard.data?.user]);
  useEffect(() => {
    if (dashboard.error) toast.error(dashboard.error.message);
  }, [dashboard.error]);
  const markRead = useMutation({
    mutationFn: async (id: string) => {
      if (!session) throw new Error('Please sign in again.');
      await markNotificationRead(id);
      const notifications = await getUserNotifications(session.id);
      if (!notifications.find((notification) => notification.id === id)?.isRead) {
        throw new Error('Unable to mark this notification as read. Please retry.');
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['home-dashboard', session?.id] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { session, dashboard, markRead };
}
