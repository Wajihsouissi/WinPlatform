'use client';

import { useSearchParams } from 'next/navigation';
import { mockDeals } from '@/data/mockDeals';
import { mockShops } from '@/data/mockShops';
import { DealCard } from '@/components/features/deals/DealCard';
import { ShopCard } from '@/components/features/shops/ShopCard';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { SlidersHorizontal, Store, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Map = dynamic(() => import('@/components/features/deals/Map'), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
            Loading Map...
        </div>
    )
});

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [searchType, setSearchType] = useState<'deals' | 'shops'>('deals');

    // Get filters from URL
    const location = searchParams.get('location');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const query = searchParams.get('q');

    // Filter logic for Deals
    const filteredDeals = useMemo(() => {
        return mockDeals.filter(deal => {
            if (query) {
                const q = query.toLowerCase();
                if (!deal.title.toLowerCase().includes(q) && !deal.storeName.toLowerCase().includes(q)) return false;
            }
            if (category && category !== 'All' && deal.category !== category) return false;
            if (minPrice && deal.newPrice < Number(minPrice)) return false;
            if (maxPrice && deal.newPrice > Number(maxPrice)) return false;
            return true;
        });
    }, [category, location, minPrice, maxPrice, query]);

    // Filter logic for Shops
    const filteredShops = useMemo(() => {
        return mockShops.filter(shop => {
            if (query) {
                const q = query.toLowerCase();
                if (!shop.name.toLowerCase().includes(q) && !shop.description.toLowerCase().includes(q)) return false;
            }
            if (category && category !== 'All' && shop.category !== category) return false;
            // Shops might not have price filter usually, but we could filter by average price if we had it. Ignoring price for shops.
            return true;
        });
    }, [category, location, query]);

    const resultCount = searchType === 'deals' ? filteredDeals.length : filteredShops.length;

    return (
        <div className="flex flex-col h-[calc(100vh-80px)]">
            <div className="px-6 py-4 border-b border-slate-100 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-sm font-medium text-slate-500">
                            {resultCount} {searchType} found
                        </span>
                        <h1 className="text-2xl font-bold text-slate-900 mt-1">
                            {location ? `${category || 'Results'} in ${location}` : 'Search results'}
                        </h1>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </button>
                </div>

                {/* Type Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setSearchType('deals')}
                        className={cn("flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all", searchType === 'deals' ? "bg-[hsl(var(--primary))] text-white shadow-sm" : "text-slate-500 hover:text-[hsl(var(--primary))]")}
                    >
                        <Tag className="h-4 w-4" />
                        Deals
                    </button>
                    <button
                        onClick={() => setSearchType('shops')}
                        className={cn("flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all", searchType === 'shops' ? "bg-[hsl(var(--primary))] text-white shadow-sm" : "text-slate-500 hover:text-[hsl(var(--primary))]")}
                    >
                        <Store className="h-4 w-4" />
                        Shops
                    </button>
                </div>
            </div>

            <div className="flex-1 flex min-h-0">
                {/* Left: Scrollable List */}
                <div className="w-full lg:w-[60%] xl:w-[55%] h-full overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-slate-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                        {searchType === 'deals' ? (
                            filteredDeals.map(deal => (
                                <DealCard key={deal.id} deal={deal} />
                            ))
                        ) : (
                            filteredShops.map(shop => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))
                        )}
                    </div>

                    {resultCount === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-lg font-bold text-slate-900">No matches found</h3>
                            <p className="text-slate-500">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>

                {/* Right: Sticky Map (Hidden on small screens) */}
                <div className="hidden lg:block lg:w-[40%] xl:w-[45%] h-full sticky top-0 border-l border-slate-200">
                    <Map
                        deals={searchType === 'deals' ? filteredDeals : []}
                        shops={searchType === 'shops' ? filteredShops : []}
                    />
                </div>
            </div>
        </div>
    );
}
