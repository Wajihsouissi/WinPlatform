export interface Deal {
    id: string;
    title: string;
    description: string;
    category: string;
    oldPrice: number;
    newPrice: number;
    discountPercent: number;
    storeName: string;
    distanceKm: number;
    expiresAt: string; // ISO date string
    imageUrl: string;
    images?: string[];
    quantityAvailable?: number;
    shopAddress?: string;
    shopPhone?: string;
    location: {
        lat: number;
        lng: number;
    };
}

export interface Order {
    id: string;
    dealId: string;
    dealTitle: string;
    quantity: number;
    totalPrice: number;
    status: 'active' | 'completed' | 'expired';
    qrCodeUrl: string; // mock URL
    purchaseDate: string;
}

export interface Category {
    id: string;
    label: string;
    value: string;
}

export interface Shop {
    id: string;
    name: string;
    description: string;
    category: string;
    rating: number;
    reviewCount: number;
    distanceKm: number;
    activeDeals: number;
    imageUrl: string;
    location: {
        lat: number;
        lng: number;
    };
    address?: string;
    coverUrl?: string;
    phoneNumber?: string;
    openingHours?: string;
}

export interface NotificationSettings {
    newDeals: boolean;
    expiringSoon: boolean;
    flashDeals: boolean;
    orderReminders: boolean;
    weeklySummary: boolean;
    promotionalThemails: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    avatarUrl: string;
    notificationSettings: NotificationSettings;
    stats: {
        activeOrders: number;
        pastOrders: number;
        savedDeals: number;
        followedShops: number;
        points: number;
    };
}
