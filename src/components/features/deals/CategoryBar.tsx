'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CategoryBarProps {
    selected: string;
    onSelect: (category: string) => void;
    counts?: Record<string, number>;
}

import { categories } from '@/data/categories';

interface CategoryBarProps {
    selected: string;
    onSelect: (category: string) => void;
    counts?: Record<string, number>;
}

export function CategoryBar({ selected, onSelect, counts = {} }: CategoryBarProps) {

    return (
        <div className="sticky top-[85px] z-40 py-2 mb-6 flex justify-center pointer-events-none bg-transparent">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pointer-events-auto flex items-center gap-1 p-1.5 bg-background/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-full max-w-[95vw] overflow-x-auto scrollbar-hide ring-1 ring-black/5"
            >
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selected === cat.id;
                    const count = counts[cat.id] || 0;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            className="relative flex items-center gap-2 px-5 py-2.5 rounded-full outline-none transition-colors group"
                        >
                            {isSelected && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-slate-900 rounded-full shadow-lg"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}

                            <motion.div
                                className="relative z-10"
                                animate={{
                                    scale: isSelected ? 1.1 : 1,
                                }}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon className={cn("h-4 w-4 transition-colors", isSelected ? "text-white stroke-[2.5px]" : "text-slate-500 group-hover:text-slate-800")} />
                            </motion.div>

                            <span className={cn(
                                "relative z-10 text-sm font-bold whitespace-nowrap transition-colors",
                                isSelected ? "text-white" : "text-slate-600 group-hover:text-slate-900"
                            )}>
                                {cat.label}
                            </span>

                            {/* Count Badge */}
                            {count > 0 && (
                                <span className={cn(
                                    "relative z-10 ml-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center",
                                    isSelected
                                        ? "bg-white text-slate-900"
                                        : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                                )}>
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </motion.div>
        </div>
    );
}
