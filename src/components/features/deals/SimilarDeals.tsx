'use client';

import { Deal } from '@/types';
import { DealCard } from './DealCard';
import { mockDeals } from '@/data/mockDeals';

interface SimilarDealsProps {
    currentDealId: string;
    category: string;
}

export function SimilarDeals({ currentDealId, category }: SimilarDealsProps) {
    const similarDeals = mockDeals
        .filter(d => d.category === category && d.id !== currentDealId)
        .slice(0, 4);

    if (similarDeals.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">You might also like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarDeals.map(deal => (
                    <DealCard key={deal.id} deal={deal} />
                ))}
            </div>
        </div>
    );
}
