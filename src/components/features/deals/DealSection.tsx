import React from 'react';
import { Deal } from '@/types';
import { DealCard } from './DealCard';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface DealSectionProps {
    title: string;
    deals: Deal[];
}

export function DealSection({ title, deals }: DealSectionProps) {
    if (deals.length === 0) return null;

    return (
        <section className="py-6 border-b border-slate-100 last:border-0">
            <div className="px-8 mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                <Link href="#" className="flex items-center gap-1 text-sm font-semibold text-slate-900 hover:underline">
                    Show all
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8 pb-4">
                {deals.map((deal) => (
                    <div key={deal.id} className="col-span-1">
                        <DealCard deal={deal} />
                    </div>
                ))}
            </div>
        </section>
    );
}
