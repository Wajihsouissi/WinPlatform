'use client';

import React, { useState } from 'react';
import { ArrowLeft, Store } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockShops } from '@/data/mockShops';
import { ShopCard } from '@/components/features/shops/ShopCard';
import Link from 'next/link';

export default function FollowedShopsPage() {
    const router = useRouter();
    // Simulate followed shops
    const [followedShops] = useState(mockShops.slice(0, 3));

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            Following
                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                                {followedShops.length}
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                {followedShops.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-24 w-24 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                            <Store className="h-10 w-10 text-purple-300 fill-current" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">You're not following any shops</h2>
                        <p className="text-slate-500 mb-8 max-w-xs">
                            Follow your favorite shops to get notified about their latest deals.
                        </p>
                        <Link
                            href="/shops"
                            className="bg-[#ff385c] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Browse Shops
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {followedShops.map((shop) => (
                            <ShopCard key={shop.id} shop={shop} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
