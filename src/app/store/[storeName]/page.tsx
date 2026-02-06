'use client';

import React, { useState, use } from 'react';
import { mockDeals } from '@/data/mockDeals';
import { mockShops } from '@/data/mockShops';
import { DealCard } from '@/components/features/deals/DealCard';
import { Store, MapPin, Star, Clock, ChevronLeft, Share2, Phone, Navigation, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        storeName: string;
    }>;
}

export default function StorePage({ params }: PageProps) {
    const { storeName: rawStoreName } = use(params);
    const storeName = decodeURIComponent(rawStoreName);
    const [isFollowed, setIsFollowed] = useState(false);

    // 1. Try to find precise store match first
    const storeDetails = mockShops.find(s => s.name === storeName);

    // 2. Mock fallback if not in mockShops (for legacy/demo purposes)
    const storeDeals = mockDeals.filter(d => d.storeName === storeName);

    // If strict matching required:
    // if (!storeDetails && storeDeals.length === 0) return notFound();

    // Derive data
    const coverUrl = storeDetails?.coverUrl || storeDeals[0]?.imageUrl || 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80';
    const logoUrl = storeDetails?.imageUrl || storeDeals[0]?.imageUrl;
    const rating = storeDetails?.rating || 4.5;
    const reviewCount = storeDetails?.reviewCount || 88;
    const category = storeDetails?.category || storeDeals[0]?.category || 'General';
    const address = storeDetails?.address || storeDeals[0]?.shopAddress || 'Tunis, Tunisia';
    const phone = storeDetails?.phoneNumber || '+216 71 000 000';
    const hours = storeDetails?.openingHours || '09:00 - 22:00';
    const description = storeDetails?.description || `Welcome to ${storeName}. We offer the best deals in town!`;

    // Map Placeholder (Static for now)
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${storeDetails?.location.lat || 36.8},${storeDetails?.location.lng || 10.1}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${storeDetails?.location.lat || 36.8},${storeDetails?.location.lng || 10.1}&key=YOUR_API_KEY`;
    // Since we don't have a key, we'll use a visual placeholder

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[250px] md:h-[320px] w-full bg-slate-900 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={coverUrl}
                        alt={storeName}
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute top-4 left-4 md:left-8 z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold transition-all hover:bg-black/30"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 z-20">
                {/* Store Profile Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-end justify-between relative overflow-hidden"
                >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                    <div className="flex flex-col md:flex-row gap-6 md:items-end">
                        <div className="h-24 w-24 md:h-32 md:w-32 rounded-3xl bg-white shadow-lg p-1.5 -mt-16 md:-mt-20 md:-mb-4 flex-shrink-0 relative z-10 rotate-3 md:rotate-0 transition-transform hover:rotate-2">
                            {logoUrl ? (
                                <div className="h-full w-full rounded-2xl overflow-hidden relative">
                                    <Image src={logoUrl} alt="Logo" fill className="object-cover" />
                                </div>
                            ) : (
                                <div className="h-full w-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-inner">
                                    {storeName.charAt(0)}
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold uppercase tracking-wider">{category}</span>
                                <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> Open Now
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">{storeName}</h1>
                            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                                <span className="flex items-center gap-1 text-amber-500 font-bold">
                                    <Star className="h-4 w-4 fill-current" />
                                    {rating} <span className="text-slate-400 font-normal">({reviewCount} reviews)</span>
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                    {address}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button
                            onClick={() => setIsFollowed(!isFollowed)}
                            className={`flex-1 md:flex-none h-12 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 ${isFollowed ? 'bg-slate-100 text-slate-900 border border-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                        >
                            <Heart className={`h-4 w-4 ${isFollowed ? 'fill-red-500 text-red-500' : ''}`} />
                            {isFollowed ? 'Following' : 'Follow'}
                        </button>
                        <button className="flex-1 md:flex-none h-12 w-12 md:w-auto md:px-6 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 active:scale-95 group">
                            <Phone className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
                            <span className="hidden md:inline">Call</span>
                        </button>
                        <button className="flex-1 md:flex-none h-12 w-12 md:w-auto md:px-6 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 active:scale-95 group">
                            <Share2 className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
                            <span className="hidden md:inline">Share</span>
                        </button>
                    </div>
                </motion.div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Sidebar: Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm"
                        >
                            <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                                <Store className="h-5 w-5 text-slate-400" />
                                About {storeName}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-8 font-medium">
                                {description}
                            </p>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Opening Hours</p>
                                        <p className="font-bold text-slate-900">{hours}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Contact</p>
                                        <p className="font-bold text-slate-900">{phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                                        <p className="font-bold text-slate-900 leading-tight">{address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Map Preview */}
                            <div className="mt-8 rounded-2xl overflow-hidden h-40 bg-slate-100 relative group cursor-pointer border border-slate-200">
                                <div className="absolute inset-0 flex items-center justify-center bg-slate-200/50">
                                    <div className="text-slate-400 flex flex-col items-center">
                                        <MapPin className="h-8 w-8 mb-2 opacity-50" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Map View</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                <button className="absolute bottom-3 right-3 bg-white shadow-md text-xs font-bold px-3 py-1.5 rounded-lg text-slate-900 flex items-center gap-1 group-hover:scale-105 transition-transform">
                                    <Navigation className="h-3 w-3" /> Get Directions
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Content: Deals */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-black text-slate-900">Active Deals</h2>
                            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{storeDeals.length} found</span>
                        </div>

                        {storeDeals.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {storeDeals.map((deal, idx) => (
                                    <motion.div
                                        key={deal.id}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 + (idx * 0.1) }}
                                    >
                                        <DealCard deal={deal} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 border-dashed">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 text-slate-300 mb-6">
                                    <Store className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No active deals</h3>
                                <p className="text-slate-500 max-w-sm mx-auto">
                                    {storeName} doesn't have any surprise bags available right now. Check back later!
                                </p>
                                <button className="mt-8 text-blue-600 font-bold text-sm hover:underline">
                                    Notify me when available
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
