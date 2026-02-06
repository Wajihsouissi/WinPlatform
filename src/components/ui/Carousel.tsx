'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
    children: React.ReactNode[];
    className?: string;
    gap?: number;
}

export function Carousel({ children, className, gap = 16 }: CarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 300); // Check after scroll animation
        }
    };

    return (
        <div className={cn("relative group", className)}>
            {/* Left Button */}
            {canScrollLeft && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => scroll('left')}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-slate-100 hover:scale-110 transition-transform -translate-x-1/2"
                    >
                        <ChevronLeft className="h-5 w-5 text-slate-700" />
                    </button>
                </div>
            )}

            {/* Scroll Container */}
            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-1"
                style={{ gap: `${gap}px` }}
            >
                {React.Children.map(children, (child, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex-shrink-0 snap-start"
                    >
                        {child}
                    </motion.div>
                ))}
            </div>

            {/* Right Button */}
            {canScrollRight && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => scroll('right')}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-slate-100 hover:scale-110 transition-transform translate-x-1/2"
                    >
                        <ChevronRight className="h-5 w-5 text-slate-700" />
                    </button>
                </div>
            )}
        </div>
    );
}
