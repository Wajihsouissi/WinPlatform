'use client';

import React from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { BrandRow } from '@/components/landing/BrandRow';
import { CategorySection } from '@/components/landing/CategorySection';
import { AppPromo } from '@/components/landing/AppPromo';
import { Footer } from '@/components/landing/Footer';

// Mock Data for Landing Page
const FASHION_DEALS = [
  { brand: 'ASOS', discount: '10% Off', image: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/ASOS_logo.svg' },
  { brand: 'SHEIN', discount: '15% Off', image: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shein-logo.png/640px-Shein-logo.png' }, // Placeholder
  { brand: 'NIKE', discount: '10% Off', image: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { brand: 'ZARA', discount: '20% Off', image: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg' },
];

const TECH_DEALS = [
  { brand: 'Apple', discount: 'Student Pricing', image: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { brand: 'Samsung', discount: '20% Off', image: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { brand: 'Dell', discount: '15% Off', image: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
  { brand: 'HP', discount: 'Up to 40%', image: '', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <main className="pt-16">
        <HeroSection />
        <BrandRow />

        <CategorySection title="Fashion" deals={FASHION_DEALS} />
        <CategorySection title="Technology" deals={TECH_DEALS} />

        <AppPromo />
      </main>

      <Footer />
    </div>
  );
}
