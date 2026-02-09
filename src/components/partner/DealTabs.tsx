import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type DealStatus = 'Active' | 'Scheduled' | 'Expired' | 'Draft' | 'Sold Out';

interface DealTabsProps {
    currentTab: string;
    onTabChange: (tab: string) => void;
    counts: Record<string, number>;
}

export function DealTabs({ currentTab, onTabChange, counts }: DealTabsProps) {
    const tabs = ['Active', 'Scheduled', 'Expired', 'Draft'];

    return (
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-full md:w-auto overflow-x-auto">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={cn(
                        "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2",
                        currentTab === tab
                            ? "text-emerald-600 bg-white shadow-sm"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    )}
                >
                    {tab}
                    <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full",
                        currentTab === tab ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                    )}>
                        {counts[tab] || 0}
                    </span>
                    {currentTab === tab && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
