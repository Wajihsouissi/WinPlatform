'use client';

import dynamic from 'next/dynamic';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockDeals } from '@/data/mockDeals';
import { DealCard } from '@/components/features/deals/DealCard';
import { ViewToggle } from '@/components/features/deals/ViewToggle';
import { CategoryBar } from '@/components/features/deals/CategoryBar';
import { DealSection } from '@/components/features/deals/DealSection';
import { Carousel } from '@/components/ui/Carousel';
import { SlidersHorizontal, Map as MapIcon, List, Clock, History, TrendingUp, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dynamically import Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/features/deals/Map'), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 rounded-xl text-slate-400 animate-pulse">
            Loading Map...
        </div>
    )
});

export default function DealsPage() {
    const searchParams = useSearchParams();
    const [view, setView] = useState<'map' | 'list'>('list'); // Default to list view as per Airbnb style
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeFilter, setActiveFilter] = useState<'distance' | 'discount' | null>(null);

    // Sync selectedCategory with URL search params on mount or param change
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    // Filter deals based on category and active filters
    const filteredDeals = useMemo(() => {
        let deals = mockDeals;

        if (selectedCategory !== 'all') {
            deals = deals.filter(d => d.category === selectedCategory);
        }

        if (activeFilter === 'distance') {
            deals = [...deals].sort((a, b) => a.distanceKm - b.distanceKm);
        } else if (activeFilter === 'discount') {
            deals = [...deals].sort((a, b) => b.discountPercent - a.discountPercent);
        }

        return deals;
    }, [selectedCategory, activeFilter]);

    // Group deals for sections (Mock logic for "Popular", "Location" etc)
    const hotDeals = useMemo(() => mockDeals.filter(d => d.discountPercent >= 40), []);
    const tunisDeals = useMemo(() => filteredDeals.filter(d => d.distanceKm < 2), [filteredDeals]);
    const foodDeals = useMemo(() => filteredDeals.filter(d => d.category === 'Food'), [filteredDeals]);
    const wellnessDeals = useMemo(() => filteredDeals.filter(d => d.category === 'Wellness'), [filteredDeals]);

    // Calculate counts for badges
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {
            all: mockDeals.length
        };

        mockDeals.forEach(deal => {
            counts[deal.category] = (counts[deal.category] || 0) + 1;
        });

        return counts;
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-transparent">
            <div className="px-8 pt-4 pb-2 space-y-4">
                {/* Recent Searches & Trending */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2">
                    <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                        <History className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-bold text-slate-500 whitespace-nowrap">Recent:</span>
                    </div>
                    {['Sushi in Tunis', 'Spa Deals', 'Haircut'].map((term) => (
                        <button key={term} className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-sm text-slate-600 font-medium hover:bg-white hover:shadow-sm transition-all whitespace-nowrap">
                            {term}
                        </button>
                    ))}
                    <div className="w-px h-6 bg-slate-200 mx-2" />
                    <div className="flex items-center gap-1 text-slate-500">
                        <TrendingUp className="h-4 w-4 text-[#ff385c]" />
                        <span className="text-sm font-bold">Trending:</span>
                    </div>
                    {['Burger', 'Gym', 'Laptop'].map((term) => (
                        <button key={term} className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-sm text-slate-600 font-medium hover:bg-white hover:shadow-sm transition-all whitespace-nowrap">
                            {term}
                        </button>
                    ))}
                </div>

                {/* Featured Carousel */}
                {selectedCategory === 'all' && view === 'list' && (
                    <div className="py-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            🔥 Hot Deals <span className="text-sm font-normal text-slate-500">Limited time offers</span>
                        </h2>
                        <Carousel>
                            {hotDeals.map(deal => (
                                <div key={deal.id} className="w-[280px] sm:w-[320px] h-[350px]">
                                    <DealCard deal={deal} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                )}
            </div>

            {/* Category Filter Bar */}
            <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} counts={categoryCounts} />

            {/* Additional Filters */}
            <div className="px-8 flex items-center gap-3 pb-4 overflow-x-auto scrollbar-hide">
                <button
                    onClick={() => setActiveFilter(activeFilter === 'distance' ? null : 'distance')}
                    className={cn("flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all", activeFilter === 'distance' ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300")}
                >
                    Distance {activeFilter === 'distance' && "↓"}
                </button>
                <button
                    onClick={() => setActiveFilter(activeFilter === 'discount' ? null : 'discount')}
                    className={cn("flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all", activeFilter === 'discount' ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300")}
                >
                    Discount % {activeFilter === 'discount' && "↓"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 text-sm font-bold hover:border-slate-300 transition-all">
                    <Filter className="h-4 w-4" /> Filters
                </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 pb-20">

                {/* View Toggle & Count overlay or header */}
                <div className="px-8 mt-4 mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-500">
                        {filteredDeals.length} deals found
                    </div>

                    {/* Floating Map Toggle Button (Airbnb Style) */}
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                        <button
                            onClick={() => setView(view === 'map' ? 'list' : 'map')}
                            className="bg-[#222] text-white px-6 py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            {view === 'list' ? (
                                <>Show Map <MapIcon className="h-4 w-4" /></>
                            ) : (
                                <>Show List <List className="h-4 w-4" /></>
                            )}
                        </button>
                    </div>
                </div>

                {view === 'map' ? (
                    <div className="h-[calc(100vh-250px)] w-full px-8 pb-8">
                        <div className="h-full w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
                            <Map deals={filteredDeals} />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* If "All" is selected or specific sorting matches, show sections */}
                        {selectedCategory === 'all' && !activeFilter ? (
                            <>
                                <DealSection title="Popular in Carthage" deals={tunisDeals} />
                                <DealSection title="Best Food Deals" deals={foodDeals} />
                                <DealSection title="Wellness & Relaxation" deals={wellnessDeals} />
                                <DealSection title="All Deals Nearby" deals={filteredDeals} />
                            </>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8 pb-10 justify-center mx-auto max-w-[1920px] w-full">
                                {filteredDeals.map(deal => (
                                    <DealCard key={deal.id} deal={deal} />
                                ))}
                            </div>
                        )}

                        {filteredDeals.length === 0 && (
                            <div className="text-center py-20 text-slate-500">
                                <p className="text-lg font-medium">No deals found in this category.</p>
                                <p>Try switching categories or adjust filters.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
