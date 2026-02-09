'use client';

import React from 'react';

const BRANDS = [
    { name: 'ASOS', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/ASOS_logo.svg' },
    { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { name: 'Levi\'s', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Levis_logo_red.svg' },
    { name: 'Sephora', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Sephora_logo.svg' },
    { name: 'H&M', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg' },
];

export function BrandRow() {
    return (
        <section className="py-10 bg-white border-b border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between gap-8 md:justify-around flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {BRANDS.map((brand, idx) => (
                        <div key={idx} className="h-8 md:h-10 flex items-center justify-center w-24 md:w-32">
                            <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
