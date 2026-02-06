import React from 'react';
import { cn } from '@/lib/utils';

interface DiscountBadgeProps {
    percent: number;
    className?: string;
}

export function DiscountBadge({ percent, className }: DiscountBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center justify-center rounded-md bg-green-600 px-2 py-1 text-xs font-bold text-white',
                className
            )}
        >
            -{percent}%
        </span>
    );
}
