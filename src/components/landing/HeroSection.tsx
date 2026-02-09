'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function HeroSection() {
    return (
        <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Students having fun"
                    className="w-full h-full object-cover opacity-80"
                />
            </div>

            <div className="relative z-20 text-center max-w-4xl px-4 animate-in fade-in zoom-in duration-700">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-lg">
                    Student Discounts on <span className="text-white">WIN</span>
                </h1>
                <p className="text-lg md:text-xl font-medium text-slate-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
                    Unlimited. University or College. Free exclusive discounts at 100+ Brands – completely free.
                </p>
                <Link href="/signup">
                    <Button className="bg-[#007AFF] hover:bg-[#0062cc] text-white px-8 py-6 text-lg rounded-lg font-bold shadow-xl transition-transform hover:scale-105">
                        Join WIN Free
                    </Button>
                </Link>
            </div>
        </section>
    );
}
