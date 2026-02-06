'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Clock, MapPin, ExternalLink, Info, CheckCircle2 } from 'lucide-react';
import { CartItem } from '@/context/CartContext';

interface TicketModalProps {
    order: CartItem | null;
    onClose: () => void;
}

export function TicketModal({ order, onClose }: TicketModalProps) {
    const [timeLeft, setTimeLeft] = useState<string>('');

    // Timer Logic
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
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
    }, [order]);

    if (!order) return null;

    const qrData = `WIN-${order.pickupCode}-${order.id}-${order.purchasedAt}`;

    return (
        <AnimatePresence>
            {order && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 p-2 z-10 text-slate-400 hover:text-slate-600 transition-colors bg-white/50 hover:bg-white rounded-full backdrop-blur-sm"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* LEFT SIDE: QR Code & Status */}
                        <div className="w-full md:w-5/12 bg-slate-50 p-6 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-dashed border-slate-200 relative">
                            {/* Decorative circles */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:hidden" />
                            <div className="hidden md:block absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

                            <div className="text-center mb-6">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-2">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Paid
                                </span>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Access Ticket</h3>
                                <p className="text-xs text-slate-400 font-mono mt-1">{order.orderNumber || '#WIN-GEN-001'}</p>
                            </div>

                            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 mb-6 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-[20px] opacity-10 blur-sm group-hover:opacity-20 transition-opacity" />
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}&color=0f172a`}
                                    alt="QR Code"
                                    className="h-40 w-40 object-contain relative z-10"
                                />
                            </div>

                            <div className="text-center w-full">
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Pickup Code</p>
                                <div className="bg-white border border-slate-200 rounded-xl py-2 px-4 flex items-center justify-between gap-3 max-w-[180px] mx-auto">
                                    <span className="text-1xl font-black text-slate-900 font-mono tracking-widest">
                                        {order.pickupCode || 'XY-99'}
                                    </span>
                                    <Copy className="h-3.5 w-3.5 text-slate-400 cursor-pointer hover:text-indigo-600" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Details */}
                        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{order.storeName}</h2>
                                <p className="text-sm font-medium text-slate-500 line-clamp-2">{order.title}</p>
                            </div>

                            <div className="space-y-4 mb-auto">
                                {/* Validity */}
                                <div className="flex items-center gap-4 p-3 rounded-xl bg-amber-50 border border-amber-100">
                                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-amber-800 uppercase">Valid For</p>
                                        <p className="text-sm font-bold text-slate-900">{timeLeft || 'Calculatting...'}</p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4 p-3">
                                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500 mt-1">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-0.5">Location</p>
                                        <p className="text-sm text-slate-700 leading-relaxed mb-1">
                                            {order.shopAddress || "12 Avenue Habib Bourguiba, Tunis"}
                                        </p>
                                        <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                                            Get Directions <ExternalLink className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100">
                                <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1.5 bg-slate-50 py-2 rounded-lg">
                                    <Info className="h-3.5 w-3.5" />
                                    Show this to cashier to redeem
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
