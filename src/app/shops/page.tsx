import React from 'react';
import { mockShops } from '@/data/mockShops';
import { ShopCard } from '@/components/features/shops/ShopCard';
import { Store } from 'lucide-react';

export default function ShopsPage() {
    return (
        <div className="min-h-screen bg-background pb-24 pt-6 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-8">
                    <span className="text-indigo-600 bg-indigo-50 p-2 rounded-xl">
                        <Store className="h-6 w-6" />
                    </span>
                    Partner Shops
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockShops.map((shop) => (
                        <div key={shop.id} className="h-[320px]">
                            <ShopCard shop={shop} />
                        </div>
                    ))}
                </div>

                {mockShops.length === 0 && (
                    <div className="text-center py-20 opacity-60">
                        <p>No shops found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
