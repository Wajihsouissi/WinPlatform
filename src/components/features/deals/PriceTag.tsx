import React from 'react';
import { cn } from '@/lib/utils';

interface PriceTagProps {
    oldPrice: number;
    newPrice: number;
    currency?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function PriceTag({
    oldPrice,
    newPrice,
    currency = 'TND',
    size = 'md',
    className,
}: PriceTagProps) {
    return (
        <div className={cn('flex items-baseline gap-2', className)}>
            <span
                className={cn(
                    'font-bold text-slate-900 tracking-tight leading-none',
                    size === 'sm' && 'text-sm',
                    size === 'md' && 'text-lg',
                    size === 'lg' && 'text-xl'
                )}
            >
                {newPrice.toFixed(0)} <span className="text-[0.6em] font-medium text-slate-500">{currency}</span>
            </span>
            <span className="text-slate-400 line-through text-xs decoration-slate-300">
                {oldPrice.toFixed(0)}
            </span>
        </div>
    );
}
