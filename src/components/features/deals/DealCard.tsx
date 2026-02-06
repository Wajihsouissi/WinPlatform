'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, MapPin, Store, ShoppingBag, Check } from 'lucide-react';
import { Deal } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface DealCardProps {
    deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(deal);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // Determine badge color based on discount
    const getDiscountColor = (percent: number) => {
        if (percent >= 50) return "bg-red-500 text-white";
        if (percent >= 30) return "bg-orange-500 text-white";
        return "bg-blue-500 text-white";
    };

    return (
        <div className="group block h-full cursor-pointer relative">
            <Link href={`/deals/${deal.id}`} className="block">
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 mb-3">
                    <img
                        src={deal.imageUrl}
                        alt={deal.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Discount Badge */}
                    <div className={cn(
                        "absolute top-3 left-3 px-3 py-1 rounded-full shadow-sm z-10 font-bold text-xs uppercase tracking-wide",
                        getDiscountColor(deal.discountPercent)
                    )}>
                        -{deal.discountPercent}%
                    </div>

                    {/* Flash Deal / Happy Hour (Simulated) */}
                    {deal.discountPercent >= 50 && (
                        <div className="absolute top-3 right-12 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm z-10 animate-pulse">
                            Flash Deal
                        </div>
                    )}
                    {deal.category === 'Food' && deal.discountPercent === 42 && (
                        <div className="absolute top-8 right-12 bg-purple-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm z-10">
                            Happy Hour
                        </div>
                    )}

                    {/* Quick Add Button (Visible on Hover) */}
                    <button
                        onClick={handleQuickAdd}
                        className={cn(
                            "absolute bottom-3 right-3 p-3 rounded-full shadow-lg transition-all duration-300 z-20",
                            added
                                ? "bg-green-500 text-white opacity-100 translate-y-0 scale-110"
                                : "bg-white text-slate-900 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-slate-50 hover:scale-105"
                        )}
                        title="Add to Orders"
                    >
                        {added ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                    </button>
                </div>

                {/* Content Section */}
                <div className="space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-[15px] font-semibold text-slate-900 truncate pr-4">
                            {deal.title}
                        </h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-xs text-yellow-500">★</span>
                            <span className="text-sm font-light text-slate-900">4.9</span>
                        </div>
                    </div>

                    <div
                        className="text-[14px] text-slate-500 truncate hover:text-slate-800 hover:underline cursor-pointer relative z-10 w-fit"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(`/store/${encodeURIComponent(deal.storeName)}`);
                        }}
                    >
                        {deal.storeName}
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-2 pt-1">
                        <span className="text-lg font-bold text-slate-900">
                            {deal.newPrice.toFixed(2)} TND
                        </span>
                        {deal.oldPrice > deal.newPrice && (
                            <span className="text-sm text-slate-400 line-through decoration-slate-400">
                                {deal.oldPrice.toFixed(2)} TND
                            </span>
                        )}
                    </div>

                    {/* Footer Metadata */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-slate-50 mt-2">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{deal.distanceKm} km</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Ends soon</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Favorite Icon (Top Right) */}
            <button className="absolute top-3 right-3 z-10 p-2 rounded-full text-white/70 hover:scale-110 transition-transform active:scale-95">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', stroke: 'white', strokeWidth: 2, overflow: 'visible' }}><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2.05 11c0 7 7 12.27 14 17z"></path></svg>
            </button>
        </div>
    );
}
