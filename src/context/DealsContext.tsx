'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Deal } from '../components/partner/DealCard';

interface DealsContextType {
    deals: Deal[];
    addDeal: (deal: Omit<Deal, 'id' | 'views' | 'claims' | 'redemptions' | 'status'> & { status?: Deal['status'] }) => void;
    updateDeal: (id: string, updates: Partial<Deal>) => void;
    deleteDeal: (id: string) => void;
    duplicateDeal: (id: string) => void;
    getDeal: (id: string) => Deal | undefined;
}

const DealsContext = createContext<DealsContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_DEALS: Deal[] = [
    {
        id: '1',
        title: '50% Off Gourmet Burger Combo',
        image: '',
        discountedPrice: 15,
        originalPrice: 30,
        views: 1245,
        claims: 85,
        redemptions: 42,
        quantity: 100,
        status: 'Active',
        validUntil: '2024-12-31'
    },
    {
        id: '2',
        title: 'Buy 1 Get 1 Free Pizza',
        image: '',
        discountedPrice: 25,
        originalPrice: 50,
        views: 850,
        claims: 120,
        redemptions: 95,
        quantity: 200,
        status: 'Active',
        validUntil: '2024-11-30'
    },
    {
        id: '3',
        title: 'Spa Day Package',
        image: '',
        discountedPrice: 80,
        originalPrice: 150,
        views: 320,
        claims: 15,
        redemptions: 5,
        quantity: 50,
        status: 'Scheduled',
        validUntil: '2025-01-15'
    },
    {
        id: '4',
        title: 'Coffee & Cake Special',
        image: '',
        discountedPrice: 8,
        originalPrice: 12,
        views: 450,
        claims: 20,
        redemptions: 18,
        quantity: 500,
        status: 'Expired',
        validUntil: '2023-10-01'
    },
    {
        id: '5',
        title: 'New Year Promo',
        image: '',
        discountedPrice: 50,
        originalPrice: 100,
        views: 0,
        claims: 0,
        redemptions: 0,
        quantity: 100,
        status: 'Draft',
        validUntil: '2025-01-01'
    }
];

export function DealsProvider({ children }: { children: React.ReactNode }) {
    const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);

    // Persist to local storage (optional enhancement)
    useEffect(() => {
        const saved = localStorage.getItem('partner-deals');
        if (saved) {
            try {
                setDeals(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse deals", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('partner-deals', JSON.stringify(deals));
    }, [deals]);


    const addDeal = (dealData: Omit<Deal, 'id' | 'views' | 'claims' | 'redemptions' | 'status'> & { status?: Deal['status'] }) => {
        const newDeal: Deal = {
            ...dealData,
            id: Math.random().toString(36).substr(2, 9),
            views: 0,
            claims: 0,
            redemptions: 0,
            status: dealData.status || 'Active',
            image: '' // Placeholder handling
        };
        setDeals(prev => [newDeal, ...prev]);
    };

    const updateDeal = (id: string, updates: Partial<Deal>) => {
        setDeals(prev => prev.map(deal => deal.id === id ? { ...deal, ...updates } : deal));
    };

    const deleteDeal = (id: string) => {
        setDeals(prev => prev.filter(deal => deal.id !== id));
    };

    const duplicateDeal = (id: string) => {
        const dealToDuplicate = deals.find(d => d.id === id);
        if (dealToDuplicate) {
            const newDeal: Deal = {
                ...dealToDuplicate,
                id: Math.random().toString(36).substr(2, 9),
                title: `${dealToDuplicate.title} (Copy)`,
                status: 'Draft',
                views: 0,
                claims: 0,
                redemptions: 0
            };
            setDeals(prev => [newDeal, ...prev]);
        }
    };

    const getDeal = (id: string) => deals.find(d => d.id === id);

    return (
        <DealsContext.Provider value={{ deals, addDeal, updateDeal, deleteDeal, duplicateDeal, getDeal }}>
            {children}
        </DealsContext.Provider>
    );
}

export function useDeals() {
    const context = useContext(DealsContext);
    if (context === undefined) {
        throw new Error('useDeals must be used within a DealsProvider');
    }
    return context;
}
