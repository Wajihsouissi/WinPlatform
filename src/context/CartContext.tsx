'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Deal } from '@/types';

export interface CartItem extends Deal {
    cartItemId: string; // Unique ID for the cart (deal ID + timestamp or similar)
    reservedAt: number;
    status: 'PENDING' | 'PAID' | 'REDEEMED' | 'EXPIRED';
    pickupCode?: string;
    redeemedAt?: string;
    orderNumber?: string;
    purchasedAt?: string; // ISO Date string
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (deal: Deal) => void;
    removeFromCart: (cartItemId: string) => void;
    clearCart: () => void;
    getCartItemsByStore: () => Record<string, CartItem[]>;
    markStoreAsPaid: (storeName: string) => void;
    reorderItem: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    // Initial state: Could hydrate from localStorage if needed
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Simple persistence for demo
        const saved = localStorage.getItem('win_cart');
        if (saved) {
            try {
                setCartItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        } else {
            // Seed some mock history data for the demo
            const mockHistory: CartItem[] = [
                {
                    id: 'hist-1',
                    cartItemId: 'hist-1-123',
                    title: 'Gourmet Burger Menu',
                    description: 'Delicious burger...',
                    category: 'Food',
                    oldPrice: 35.00,
                    newPrice: 17.50,
                    discountPercent: 50,
                    storeName: 'Burger House',
                    distanceKm: 1.2,
                    expiresAt: '2024-01-20',
                    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80',
                    location: { lat: 36.8, lng: 10.1 },
                    reservedAt: Date.now() - 10000000,
                    status: 'REDEEMED',
                    redeemedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
                    orderNumber: '#ORD-9921',
                    pickupCode: '1234',
                    purchasedAt: new Date(Date.now() - 90000000).toISOString()
                },
                {
                    id: 'hist-2',
                    cartItemId: 'hist-2-456',
                    title: 'Spa Access Pass',
                    description: 'Relaxing day...',
                    category: 'Wellness',
                    oldPrice: 80.00,
                    newPrice: 40.00,
                    discountPercent: 50,
                    storeName: 'Zen Spa',
                    distanceKm: 3.5,
                    expiresAt: '2024-01-15',
                    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=200&q=80',
                    location: { lat: 36.8, lng: 10.1 },
                    reservedAt: Date.now() - 20000000,
                    status: 'REDEEMED',
                    redeemedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                    orderNumber: '#ORD-8842',
                    pickupCode: '5678',
                    purchasedAt: new Date(Date.now() - 400000000).toISOString()
                }
            ];
            // Only set if completely empty to avoid overwriting user actions during dev
            // But for this demo updates, let's just merge or set them if empty
            setCartItems(mockHistory);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('win_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = useCallback((deal: Deal) => {
        const newItem: CartItem = {
            ...deal,
            cartItemId: `${deal.id}-${Date.now()}`,
            reservedAt: Date.now(),
            status: 'PENDING',
        };
        setCartItems(prev => [...prev, newItem]);
    }, []);

    const removeFromCart = useCallback((cartItemId: string) => {
        setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const markStoreAsPaid = useCallback((storeName: string) => {
        setCartItems(prev => prev.map(item => {
            if (item.storeName === storeName && item.status === 'PENDING') {
                return {
                    ...item,
                    status: 'PAID',
                    pickupCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
                    orderNumber: `#WIN-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`,
                    purchasedAt: new Date().toISOString()
                };
            }
            return item;
        }));
    }, []);

    const getCartItemsByStore = useCallback(() => {
        return cartItems.reduce((acc, item) => {
            if (!acc[item.storeName]) {
                acc[item.storeName] = [];
            }
            acc[item.storeName].push(item);
            return acc;
        }, {} as Record<string, CartItem[]>);
    }, [cartItems]);

    const reorderItem = useCallback((item: CartItem) => {
        const newItem: CartItem = {
            ...item,
            cartItemId: `${item.id}-${Date.now()}`,
            reservedAt: Date.now(),
            status: 'PENDING',
            pickupCode: undefined, // Reset specific fields
            redeemedAt: undefined,
            orderNumber: undefined
        };
        setCartItems(prev => [...prev, newItem]);
    }, []);

    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartItemsByStore,
        markStoreAsPaid,
        reorderItem
    }), [cartItems, addToCart, removeFromCart, clearCart, getCartItemsByStore, markStoreAsPaid, reorderItem]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
