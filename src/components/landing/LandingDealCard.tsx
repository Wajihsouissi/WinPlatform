'use client';

import React from 'react';
import { Heart } from 'lucide-react';

interface LandingDealCardProps {
    brand: string;
    discount: string;
    image: string;
    logo?: string;
}

export function LandingDealCard({ brand, discount, image, logo }: LandingDealCardProps) {
    return (
        <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 cursor-pointer">
            {/* Logo Overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
                {logo ? (
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                        <img src={logo} alt={brand} className="h-6 object-contain" />
                    </div>
                ) : (
                    <span className="text-xl font-black text-slate-900 drop-shadow-md bg-white/80 px-2 py-1 rounded">{brand}</span>
                )}
            </div>

            <div className="absolute top-3 right-3 z-10">
                <button className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                </button>
            </div>

            <div className="h-40 bg-slate-100 flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                {/* Fallback layout if no image, but we'll try to use logos/text */}
                <div className="text-center">
                    <p className="text-3xl font-bold text-slate-800">{discount}</p>
                    <p className="text-sm font-medium text-slate-500 mt-1">Discount</p>
                </div>
            </div>

            <div className="p-4 text-center border-t border-slate-50 relative z-20 bg-white">
                <h3 className="font-bold text-slate-900">{brand}</h3>
                <p className="text-sm text-slate-500">{discount}</p>
            </div>
        </div>
    );
}
