'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { categories } from '@/data/categories';
import { mockDeals } from '@/data/mockDeals';

export default function CategoriesPage() {
    // Calculate counts for each category
    const categoryCounts = React.useMemo(() => {
        const counts: Record<string, number> = {};
        mockDeals.forEach(deal => {
            counts[deal.category] = (counts[deal.category] || 0) + 1;
        });
        return counts;
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="p-2 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6 text-slate-700" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">All Categories</h1>
                        <p className="text-slate-500">Explore deals by category</p>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categories.filter(c => c.id !== 'all').map((category) => {
                        const Icon = category.icon;
                        const count = categoryCounts[category.id] || 0;

                        return (
                            <Link key={category.id} href={`/?category=${category.id}`}>
                                <div
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center group transform hover:scale-105"
                                >
                                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-slate-100 transition-colors text-slate-700 group-hover:text-slate-900">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-1">{category.label}</h3>
                                    <p className="text-xs font-medium text-slate-500">
                                        {count} {count === 1 ? 'deal' : 'deals'}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
