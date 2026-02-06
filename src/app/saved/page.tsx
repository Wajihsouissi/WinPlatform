'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockDeals } from '@/data/mockDeals';
import { DealCard } from '@/components/features/deals/DealCard';
import Link from 'next/link';

export default function SavedDealsPage() {
    const router = useRouter();
    // Simulate saved deals (in a real app, this would come from User context/API)
    const [savedDeals, setSavedDeals] = useState(mockDeals.slice(0, 4));
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDeals = savedDeals.filter(deal =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.storeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleRemove = (e: React.MouseEvent, dealId: string) => {
        e.preventDefault();
        e.stopPropagation();
        setSavedDeals(prev => prev.filter(d => d.id !== dealId));
    };

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            Saved Deals
                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                                {savedDeals.length}
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* Search / Filter */}
                {savedDeals.length > 0 && (
                    <div className="mb-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search your wishlist..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-sm"
                        />
                    </div>
                )}

                {/* Content */}
                {savedDeals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <Heart className="h-10 w-10 text-red-300 fill-current" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-slate-500 mb-8 max-w-xs">
                            Tap the heart icon on any deal to save it here for later.
                        </p>
                        <Link
                            href="/"
                            className="bg-[#ff385c] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Explore Deals
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDeals.length > 0 ? (
                            filteredDeals.map((deal) => (
                                <div key={deal.id} className="relative group">
                                    <DealCard deal={deal} />
                                    {/* Overlay remove button for better UX on this specific page */}
                                    {/* Note: DealCard has its own heart, but we might want a specific 'Remove' action or rely on the heart toggling off */}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-slate-500">
                                No deals found matching "{searchQuery}"
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
