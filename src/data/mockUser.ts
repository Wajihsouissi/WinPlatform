import { User } from '@/types';

export const mockUser: User = {
    id: 'u1',
    name: 'Wajih Souissi',
    email: 'wajih.souissi@example.com',
    phone: '+216 55 123 456',
    city: 'Tunis',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    notificationSettings: {
        newDeals: true,
        expiringSoon: true,
        flashDeals: false,
        orderReminders: true,
        weeklySummary: false,
        promotionalThemails: true
    },
    stats: {
        activeOrders: 2,
        pastOrders: 14,
        savedDeals: 8,
        followedShops: 5,
        points: 450
    }
};
