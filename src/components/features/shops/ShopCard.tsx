'use client';

import React from 'react';
import { Shop } from '@/types';
import { Star, MapPin, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ShopCardProps {
    shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
    return (
        <Link href={`/store/${encodeURIComponent(shop.name)}`} className="group block h-full">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Cover Image */}
                <div className="h-32 bg-slate-100 relative overflow-hidden">
                    {shop.coverUrl ? (
                        <img
                            src={shop.coverUrl}
                            alt={shop.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                            <StoreIcon className="h-10 w-10" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="p-4 relative flex-1 flex flex-col">
                    {/* Logo - Floating */}
                    <div className="absolute -top-10 left-4 h-16 w-16 rounded-xl border-4 border-white shadow-md bg-white overflow-hidden">
                        <img
                            src={shop.imageUrl}
                            alt={shop.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="mt-6 flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{shop.name}</h3>
                            <p className="text-sm text-slate-500 mb-2 truncate max-w-[200px]">{shop.description}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-bold text-yellow-700">{shop.rating}</span>
                                <span className="text-[10px] text-yellow-600">({shop.reviewCount})</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-2 mb-4">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{shop.distanceKm} km</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <div className="flex items-center gap-1 text-slate-700 font-medium">
                            <Tag className="h-3 w-3" />
                            <span>{shop.activeDeals} Active Deals</span>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-sm">
                        <span className="text-slate-400">{shop.category}</span>
                        <span className="flex items-center gap-1 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                            Visit Store
                            <ArrowRight className="h-4 w-4" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function StoreIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 21H21V19C21 16.2386 18.7614 14 16 14C13.2386 14 11 16.2386 11 19V21M3 21V19C3 16.2386 5.23858 14 8 14C10.7614 14 13 16.2386 13 19V21M3 21H11M11 21H16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    )
}
