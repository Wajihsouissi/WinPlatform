'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/context/CartContext';
import { CheckCircle2, QrCode, MapPin, ExternalLink, Clock, Copy, Info } from 'lucide-react';
import Link from 'next/link';

export default function TicketPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { cartItems } = useCart();
    const [order, setOrder] = useState<CartItem | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        // Find the order
        const foundOrder = cartItems.find(item => item.cartItemId === id);
        if (foundOrder) {
            setOrder(foundOrder);
        } else {
            // If not found (e.g. direct link reload might miss context if not persisted properly in this naive demo), 
            // In a real app we'd fetch from API. 
            // For now, redirect or show error.
            if (cartItems.length > 0) router.push('/orders');
        }
    }, [id, cartItems, router]);

    // Timer Logic for 24h validity
    useEffect(() => {
        if (!order || !order.purchasedAt) return;

        const updateTimer = () => {
            const purchasedTime = new Date(order.purchasedAt!).getTime();
            const expiryTime = purchasedTime + 24 * 60 * 60 * 1000; // 24 hours
            const now = Date.now();
            const diff = expiryTime - now;

            if (diff <= 0) {
                setTimeLeft('Expired');
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${hours}h ${minutes}m`);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [order]);

    if (!order) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div></div>;

    const qrData = `WIN-${order.pickupCode}-${order.id}-${order.purchasedAt}`;

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 flex flex-col items-center">

            {/* Success Message */}
            <div className="text-center mb-6 animate-in slide-in-from-top-4 duration-500">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4 shadow-sm">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Order Confirmed!</h1>
                <p className="text-slate-500">Your deal is ready for pickup</p>
            </div>

            {/* Ticket Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-500 relative">
                {/* Decorative Top Border */}
                <div className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="p-8">
                    {/* Header */}
                    <div className="border-b border-dashed border-slate-200 pb-6 mb-6">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order Ticket</span>
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">{order.orderNumber || '#WIN-GEN-001'}</span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 leading-tight mb-1">{order.storeName}</h2>
                        <p className="text-sm text-slate-500">{order.title}</p>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="bg-white p-4 rounded-3xl border-2 border-dashed border-indigo-100 shadow-sm relative group mb-4">
                            <div className="absolute inset-0 bg-indigo-50/50 rounded-[22px] m-1 -z-10" />
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}&color=0f172a`}
                                alt="QR Code"
                                className="h-48 w-48 object-contain"
                            />
                        </div>

                        {/* Backup Code */}
                        <div className="text-center">
                            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">Pickup Code</p>
                            <div className="flex items-center gap-2 justify-center">
                                <span className="text-3xl font-black text-indigo-900 tracking-widest font-mono">
                                    {order.pickupCode || 'XY-99'}
                                </span>
                                <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors" title="Copy code">
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Validity Timer */}
                    <div className="bg-amber-50 rounded-xl p-4 flex items-center justify-between mb-6 border border-amber-100">
                        <div className="flex items-center gap-3">
                            <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Valid For</p>
                                <p className="font-bold text-amber-900">{timeLeft}</p>
                            </div>
                        </div>
                        <Info className="h-4 w-4 text-amber-300" />
                    </div>

                    {/* Store Directions */}
                    <div className="bg-slate-50 rounded-2xl p-4">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 mb-0.5">Location</h4>
                                <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                                    {order.shopAddress || "12 Avenue Habib Bourguiba, Tunis"}
                                </p>
                                <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                                    Get Directions <ExternalLink className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions Footer */}
                <div className="bg-slate-900 p-6 text-center">
                    <p className="text-indigo-200 text-sm font-medium flex items-center justify-center gap-2">
                        <Info className="h-4 w-4" />
                        Show this ticket to the cashier
                    </p>
                </div>
            </div>

            {/* Done Button */}
            <div className="mt-8 w-full max-w-md">
                <Link
                    href="/orders?tab=paid"
                    className="block w-full bg-white border border-slate-200 text-slate-900 font-bold text-center py-4 rounded-xl shadow-sm hover:bg-slate-50 transition-colors"
                >
                    Done
                </Link>
            </div>
        </div>
    );
}
