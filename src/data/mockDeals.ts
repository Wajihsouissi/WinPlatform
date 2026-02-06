import { Deal } from '@/types';

export const mockDeals: Deal[] = [
    {
        id: '1',
        title: '50% Off Gourmet Burger Menu',
        description: 'Enjoy a delicious gourmet burger with fries and drink. Choice of beef or chicken. Our burgers are made with 100% locally sourced meat and fresh vegetables daily.',
        category: 'Food',
        oldPrice: 35.00,
        newPrice: 17.50,
        discountPercent: 50,
        storeName: 'Burger House',
        distanceKm: 1.2,
        expiresAt: '2024-02-01T23:59:59Z',
        quantityAvailable: 15,
        shopAddress: '12 Avenue Habib Bourguiba, Tunis',
        shopPhone: '+216 71 123 456',
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80'
        ],
        location: { lat: 36.8065, lng: 10.1815 } // Tunis center
    },
    {
        id: '2',
        title: 'Full Body Spa Treatment',
        description: 'Relax with a 60-minute massage and facial treatment. Includes access to sauna and steam room.',
        category: 'Wellness',
        oldPrice: 120.00,
        newPrice: 79.99,
        discountPercent: 33,
        storeName: 'Zen Spa',
        distanceKm: 3.5,
        expiresAt: '2024-02-05T23:59:59Z',
        quantityAvailable: 5,
        shopAddress: '5 Rue de la Republique, Le Bardo',
        shopPhone: '+216 71 987 654',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80'
        ],
        location: { lat: 36.8188, lng: 10.1658 } // Le Bardo
    },
    {
        id: '3',
        title: 'Professional Haircut & Styling',
        description: 'Get a fresh look with our expert stylists. Wash, cut, and style included.',
        category: 'Beauty',
        oldPrice: 45.00,
        newPrice: 25.00,
        discountPercent: 44,
        storeName: 'Elite Salon',
        distanceKm: 0.8,
        expiresAt: '2024-01-31T23:59:59Z',
        imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
        location: { lat: 36.8000, lng: 10.1900 } // Near Habib Bourguiba
    },
    {
        id: '4',
        title: 'Wireless Noise Cancelling Headphones',
        description: 'Premium sound quality with active noise cancellation. 30-hour battery life.',
        category: 'Electronics',
        oldPrice: 299.00,
        newPrice: 199.00,
        discountPercent: 33,
        storeName: 'Tech Store',
        distanceKm: 5.0,
        expiresAt: '2024-02-10T23:59:59Z',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        location: { lat: 36.8500, lng: 10.2000 } // Lac 2
    },
    {
        id: '5',
        title: 'Italian Pizza Dinner for Two',
        description: 'Two large pizzas of your choice plus drinks in a romantic setting.',
        category: 'Food',
        oldPrice: 50.00,
        newPrice: 29.00,
        discountPercent: 42,
        storeName: 'Bella Napoli',
        distanceKm: 2.1,
        expiresAt: '2024-02-03T23:59:59Z',
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        location: { lat: 36.8300, lng: 10.2300 } // Goulette
    },
    {
        id: '6',
        title: 'Morning Dairy Pack',
        description: 'Fresh Milk (1L) and Assorted Fruit Yogurts (4-pack). This surprise bag contains a mix of high-quality items.',
        category: 'Food',
        oldPrice: 9.00,
        newPrice: 4.50,
        discountPercent: 50,
        storeName: 'Monoprix La Marsa',
        distanceKm: 0.8,
        expiresAt: '2024-02-05T23:59:59Z',
        quantityAvailable: 3,
        imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
        location: { lat: 36.8788, lng: 10.3258 } // La Marsa
    },
    {
        id: '7',
        title: 'Farm Fresh Eggs',
        description: 'Tray of 30 fresh organic eggs from local farms.',
        category: 'Food',
        oldPrice: 12.00,
        newPrice: 6.00,
        discountPercent: 50,
        storeName: 'Aziza Supermarket',
        distanceKm: 1.5,
        expiresAt: '2024-02-04T23:59:59Z',
        imageUrl: 'https://images.unsplash.com/photo-1569254994521-ddadd2540d54?auto=format&fit=crop&w=800&q=80',
        location: { lat: 36.8500, lng: 10.2000 } // Carthage/Lc
    }
];
