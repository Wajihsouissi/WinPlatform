'use client';

import React from 'react';
import Link from 'next/link';
import { LandingDealCard } from './LandingDealCard';

interface CategorySectionProps {
    title: string;
    deals: Array<{
        brand: string;
        discount: string;
        image: string;
        logo?: string;
    }>;
}

export function CategorySection({ title, deals }: CategorySectionProps) {
    return (
        <section className="py-12 max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                <Link href="/deals" className="text-sm font-semibold text-[#007AFF] hover:underline">
                    See more &gt;
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {deals.map((deal, idx) => (
                    <LandingDealCard key={idx} {...deal} />
                ))}
            </div>
        </section>
    );
}
