'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, Lock, CheckCircle2, ShoppingBag, ArrowLeft, Building2, Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn utility is available based on previous files

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvc: ''
    });
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Mock deal data - In a real app, fetch this based on dealId
    const deal = {
        id: '1',
        title: 'Morning Dairy Pack',
        store: 'Monoprix La Marsa',
        price: 4.50,
        originalPrice: 9.00,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=200&h=200', // Mock Image
        pickupTime: '17:00 - 20:00',
        qty: 1
    };

    const serviceFee = 0.50;
    const totalSavings = deal.originalPrice - deal.price;
    const total = deal.price + serviceFee;

    const handleConfirmPayment = () => {
        // Here you would process the payment
        // For now, just navigate to orders with a success param or similar
        // Or show the confirmation modal first as requested
        setShowConfirmModal(true);
    };

    const handleFinalizeOrder = () => {
        setShowConfirmModal(false);
        const storeName = searchParams.get('store');
        // Simulate processing...
        setTimeout(() => {
            router.push(`/orders?payment_success=true&store=${storeName || ''}`);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-background pb-20 pt-6"> {/* Added padding top/bottom */}
            <div className="max-w-4xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="h-6 w-6 text-slate-700" />
                    </button>
                    <h1 className="text-2xl font-bold text-slate-900">Checkout ({deal.qty} items)</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Payment Method & Details */}
                    <div className="md:col-span-8 space-y-6">

                        {/* Payment Method Selection */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Select Payment Method</h2>

                            <div className="space-y-4">
                                {/* Pay Online Option */}
                                <label className={cn(
                                    "flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                                    paymentMethod === 'online' ? "border-[#0EA5E9] bg-slate-50" : "border-slate-200 hover:border-slate-300"
                                )}>
                                    <div className="relative flex items-center justify-center mt-1">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'online'}
                                            onChange={() => setPaymentMethod('online')}
                                            className="appearance-none h-5 w-5 rounded-full border-2 border-slate-300 checked:border-[#0EA5E9] checked:bg-[#0EA5E9] transition-all"
                                        />
                                        {paymentMethod === 'online' && <div className="absolute h-2 w-2 bg-white rounded-full pointer-events-none" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-slate-900">Pay Online Now</span>
                                            <CreditCard className="h-5 w-5 text-[#3b82f6]" /> {/* Blue card icon */}
                                        </div>
                                        <p className="text-sm text-slate-500">Secure payment via Credit Card</p>
                                    </div>
                                </label>

                                {/* Pay Cash Option */}
                                <label className={cn(
                                    "flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all",
                                    paymentMethod === 'cash' ? "border-[#0EA5E9] bg-slate-50" : "border-slate-200 hover:border-slate-300"
                                )}>
                                    <div className="relative flex items-center justify-center mt-1">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'cash'}
                                            onChange={() => setPaymentMethod('cash')}
                                            className="appearance-none h-5 w-5 rounded-full border-2 border-slate-300 checked:border-[#0EA5E9] checked:bg-[#0EA5E9] transition-all"
                                        />
                                        {paymentMethod === 'cash' && <div className="absolute h-2 w-2 bg-white rounded-full pointer-events-none" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-slate-900">Pay Cash on Pickup</span>
                                            <Wallet className="h-5 w-5 text-green-500" /> {/* Green wallet/cash icon */}
                                        </div>
                                        <p className="text-sm text-slate-500">Pay directly at the store counter</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Card Details Form - Only if Online */}
                        <AnimatePresence>
                            {paymentMethod === 'online' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: -20 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-slate-900">Card Details</h2>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                                            <div className="w-8 h-5 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Number</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="0000 0000 0000 0000"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all font-mono text-slate-700"
                                                    value={cardDetails.number}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all text-center"
                                                    value={cardDetails.expiry}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">CVC</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all text-center"
                                                    value={cardDetails.cvc}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>


                    {/* Right Column: Order Summary */}
                    <div className="md:col-span-4 space-y-6 sticky top-24">
                        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>

                            {/* Item */}
                            <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="h-16 w-16 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                    <img src={deal.image} alt={deal.title} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 truncate">{deal.title}</h3>
                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                        <Building2 className="h-3 w-3" />
                                        <span className="truncate">{deal.store}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="text-xs font-medium text-[#0EA5E9] bg-sky-50 px-2 py-0.5 rounded-full">QTY: {deal.qty}</div>
                                        <div className="font-bold text-slate-900">TND {deal.price.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 text-sm mb-6">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal ({deal.qty} items)</span>
                                    <span>TND {deal.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Service Fee</span>
                                    <span>TND {serviceFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Total Savings</span>
                                    <span>-TND {totalSavings.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-slate-100 mb-8">
                                <span className="font-bold text-slate-900 text-lg">Total</span>
                                <span className="font-extrabold text-slate-900 text-2xl">TND {total.toFixed(2)}</span>
                            </div>

                            {/* Pay Button */}
                            <button
                                onClick={handleConfirmPayment}
                                className="w-full bg-[#0f172a] hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Lock className="h-5 w-5" />
                                <span>Pay TND {total.toFixed(2)}</span>
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                <span>Secure Payment Guaranteed</span>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Confirmation Modal */}
                <AnimatePresence>
                    {showConfirmModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowConfirmModal(false)}
                                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                                className="relative bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl items-center text-center overflow-hidden"
                            >
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>

                                <div className="h-16 w-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0EA5E9]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Payment?</h3>
                                <p className="text-slate-500 mb-8">
                                    You are about to pay <span className="font-bold text-slate-900">TND {total.toFixed(2)}</span> via {paymentMethod === 'online' ? 'Credit Card' : 'Cash on Pickup'}.
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleFinalizeOrder}
                                        className="w-full bg-[#0f172a] hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold transition-transform active:scale-[0.98]"
                                    >
                                        Yes, Confirm Order
                                    </button>
                                    <button
                                        onClick={() => setShowConfirmModal(false)}
                                        className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 py-3.5 rounded-xl font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
