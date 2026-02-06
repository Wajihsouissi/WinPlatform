import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockDeals } from '@/data/mockDeals';
import { DealActions } from '@/components/features/deals/DealActions';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { CountdownTimer } from '@/components/features/deals/CountdownTimer';
import { SimilarDeals } from '@/components/features/deals/SimilarDeals';
import { Clock, MapPin, Store, ChevronLeft, Share2, Heart, Phone, Navigation } from 'lucide-react';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function DealPage(props: PageProps) {
    const params = await props.params;
    const deal = mockDeals.find((d) => d.id === params.id);

    if (!deal) {
        notFound();
    }

    const images = deal.images || [deal.imageUrl];

    return (
        <div className="mx-auto max-w-6xl px-4 md:px-6 pb-20 pt-4">
            {/* Header / Breadcrumbs */}
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 group"
                >
                    <div className="p-1 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                    </div>
                    Back to Deals
                </Link>
                <div className="flex gap-2">
                    <button className="rounded-full p-2.5 bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all hover:scale-105 active:scale-95">
                        <Share2 className="h-5 w-5" />
                    </button>
                    <button className="rounded-full p-2.5 bg-slate-50 border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all hover:scale-105 active:scale-95">
                        <Heart className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Left Column: Gallery (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <ImageGallery images={images} alt={deal.title} />

                    {/* Description - Desktop */}
                    <div className="hidden lg:block">
                        <h3 className="font-bold text-slate-900 mb-3 text-lg">About this deal</h3>
                        <p className="text-slate-600 leading-relaxed text-base">
                            {deal.description}
                        </p>
                    </div>
                </div>

                {/* Right Column: Details Sticky (5 cols) */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 flex flex-col gap-6">

                        {/* Title & Price Header */}
                        <div>
                            <div className="mb-2">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {deal.category}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-4">{deal.title}</h1>

                            <div className="flex items-end gap-3 mb-2">
                                <div className="text-4xl font-black text-slate-900">
                                    <span className="text-lg font-bold text-slate-500 mr-1">TND</span>
                                    {deal.newPrice.toFixed(2)}
                                </div>
                                <div className="text-lg text-slate-400 line-through decoration-slate-400 mb-1.5">
                                    TND {deal.oldPrice.toFixed(2)}
                                </div>
                                <span className="mb-2 bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-md">
                                    -{deal.discountPercent}%
                                </span>
                            </div>

                            <p className="text-sm text-slate-500">Prices include VAT.</p>
                        </div>

                        {/* Availability Bar */}
                        {deal.quantityAvailable && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className={deal.quantityAvailable < 5 ? "text-orange-500" : "text-emerald-600"}>
                                        {deal.quantityAvailable < 5 ? `Hurry! Only ${deal.quantityAvailable} left` : "Available Now"}
                                    </span>
                                    <span className="text-slate-400">Limited Quantity</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${deal.quantityAvailable < 5 ? "bg-orange-500" : "bg-emerald-500"}`}
                                        style={{ width: `${Math.min(100, (deal.quantityAvailable / 20) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Valid Until Card */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <div className="flex items-center gap-2 mb-3">
                                <Clock className="h-4 w-4 text-slate-400" />
                                <span className="text-xs font-bold uppercase text-slate-500">Offer Expires In</span>
                            </div>
                            <CountdownTimer targetDate={deal.expiresAt} />
                        </div>

                        {/* Store Info Card */}
                        <div className="rounded-2xl border border-slate-200 p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl">
                                        {deal.storeName.charAt(0)}
                                    </div>
                                    <div>
                                        <Link href={`/store/${encodeURIComponent(deal.storeName)}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                            {deal.storeName}
                                        </Link>
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <span className="text-yellow-500 font-bold">★ 4.8</span>
                                            <span>({deal.distanceKm} km away)</span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={`/store/${encodeURIComponent(deal.storeName)}`}
                                    className="text-xs font-bold text-blue-600 hover:underline"
                                >
                                    View Profile
                                </Link>
                            </div>

                            {deal.shopAddress && (
                                <div className="flex items-start gap-3 text-sm text-slate-600 pt-3 border-t border-slate-100">
                                    <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-slate-400" />
                                    <span>{deal.shopAddress}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                                    <Navigation className="h-4 w-4" />
                                    Directions
                                </button>
                                {deal.shopPhone && (
                                    <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                                        <Phone className="h-4 w-4" />
                                        Call Shop
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Action Details */}
                        <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-xl text-xs font-medium border border-blue-100">
                            <Store className="h-4 w-4" />
                            <span>Pickup in store using QR code</span>
                        </div>

                        {/* Primary Action */}
                        <div className="sticky bottom-4 z-20">
                            <DealActions deal={deal} />
                        </div>
                    </div>
                </div>

                {/* Mobile Description (Shown below on mobile) */}
                <div className="lg:hidden">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">About this deal</h3>
                    <p className="text-slate-600 leading-relaxed text-base">
                        {deal.description}
                    </p>
                </div>
            </div>

            {/* Similar Deals */}
            <SimilarDeals currentDealId={deal.id} category={deal.category} />
        </div>
    );
}
