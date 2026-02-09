import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PartnerStatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
        label: string;
    };
    className?: string;
}

export function PartnerStatsCard({ title, value, icon: Icon, trend, className }: PartnerStatsCardProps) {
    return (
        <div className={cn("bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow", className)}>
            <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                </div>
                {trend && (
                    <div className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1",
                        trend.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                        <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
                        <span className="text-slate-400 font-normal">{trend.label}</span>
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            </div>
        </div>
    );
}
